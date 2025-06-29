import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";

// register controller
export async function registerController(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide email, name and password",
                error: true,
                success: false,
            });
        }

        const user = await UserModel.findOne({ email: email });

        if (user) {
            return res.status(403).json({
                message: "Email is already registered",
                error: true,
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const payload = {
            name,
            email,
            password: hashedPassword,
        };

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save}`;

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from SnapBasket",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl,
            }),
        });

        return res.status(200).json({
            message: "User register successfully",
            error: false,
            success: true,
            data: save,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

// verify email controller
export async function verifyEmailController(req, res) {
    try {
        const code = req.body;

        const user = await UserModel.findOne({ _id: code });

        if (!user) {
            return res.status(400).json({
                message: "Invalid code",
                error: true,
                success: false,
            });
        }

        const updateUser = await UserModel.updateOne(
            { _id: code },
            {
                verify_email: true,
            }
        );

        return res.json({
            message: "Email verification done",
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

// login controller
export async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password",
                error: true,
                success: false,
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not register",
                error: true,
                success: false,
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "Check your password",
                error: true,
                success: false,
            });
        }

        if (user.status !== "Active") {
            return res.status(400).json({
                message: "Contact to Admin",
                error: true,
                success: false,
            });
        }

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };

        res.cookie("accessToken", accessToken, cookieOption);
        res.cookie("refreshToken", refreshToken, cookieOption);

        res.status(200).json({
            message: "login successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

// logout controller
export async function logoutController(req, res) {
    try {
        const userId = req.userId;

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };

        res.clearCookie("accessToken", cookieOption);
        res.clearCookie("refreshToken", cookieOption);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
            refresh_token: "",
        });

        return res.json({
            message: "logout successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

// upload user avater
export async function uploadAvatar(req, res) {
    try {
        const userId = req.userId; //auth middleware
        const image = req.file; //multer middleware
        const upload = await uploadImageCloudinary(image);

        await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url,
        });

        return res.json({
            message: "profile uploaded successfully",
            data: {
                _id: userId,
                avatar: upload.url,
            },
            error: false,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

// update user details
export async function updateUserDetails(req, res) {
    try {
        const userId = req.userId;
        const { name, email, mobile, password } = req.body;

        let hashedPassword = "";
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                ...(name && { name: name }),
                ...(email && { email: email }),
                ...(password && { password: hashedPassword }),
                ...(mobile && { mobile: mobile }),
            },
            { new: true }
        );

        res.status(200).json({
            message: "upadate successfully",
            error: false,
            success: true,
            data: updateUser,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

//forgot password
export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: "Email not register",
                rror: true,
                success: false,
            });
        }

        const otp = generateOtp();
        const expireTime = new Date(Date.now() + 10 * 60 * 1000); // 10 min

        await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expireTime).toISOString(),
        });

        await sendEmail({
            sendTo: email,
            subject: "Reset Your SnapBasket Password",
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp,
            }),
        });

        return res.status(200).json({
            message: "Check your email",
            error: false,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

//verify forgot password otp
export async function verifyForgotPasswordOtp(req, res) {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                message: "Provide required fields email, otp",
                error: true,
                success: false,
            });
        }

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                message: "Email not register",
                error: true,
                success: false,
            });
        }

        const currentTime = new Date();
        
        const expiryDate = new Date(user.forgot_password_expiry);
        if (expiryDate < currentTime) {
            return res.status(400).json({
                message: "Your OTP has expired. Please request a new one to continue",
                error: true,
                success: false,
            });
        }

        if (user.forgot_password_otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false,
            });
        }

        return res.status(200).json({
            message: "Verify otp successfull",
            error: false,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

//reset the password
export async function resetPassword(req, res) {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message:
                    "Provide required fields email, newPassword and confirmPassword",
                error: true,
                success: false,
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "New password and confirm password do not match",
                error: true,
                success: false,
            });
        }

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                message: "Email not register",
                error: true,
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await UserModel.findOneAndUpdate(user._id, {
            password: hashedPassword,
        });

        return res.status(200).json({
            message: "Your password has been successfully updated",
            error: false,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

//refresh token controller
export async function refreshToken(req, res) {
    try {
        const refreshToken =
            req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];

        if (!refreshToken) {
            return res.status(401).json({
                message: "Invalid token",
                error: true,
                success: false,
            });
        }

        const verifyToken = await jwt.verify(
            refreshToken,
            process.env.SECRET_KEY_REFRESH_TOKEN
        );

        if (!verifyToken) {
            return res.status(401).json({
                message: "token is expired",
                error: true,
                success: false,
            });
        }

        const userId = verifyToken.id;
        const newAccessToken = await generateAccessToken(userId);

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };

        res.cookie("accessToken", newAccessToken, cookieOption);

        return res.status(200).json({
            message: "New Access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}
