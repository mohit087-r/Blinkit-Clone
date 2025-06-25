import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js';

// register controller
export async function registerController(req, res){
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message : 'Please provide email, name and password',
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email : email });
        
        if(user){
            return res.status(403).json({
                message : 'Email is already registered',
                error : true,
                success : false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
       
        const payload =  {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : 'Verify email from SnapBasket',
            html : verifyEmailTemplate({
                name,
                url : verifyEmailUrl
            })
        })

        return res.status(200).json({
            message : 'User register successfully',
            error : false,
            success : true,
            data : save
        })
    }
    catch (error) {
        return res.status(500).json({
            message : 'Internal server error',
            error : true,
            success : false
        })
    }
}


// verify email controller
export async function verifyEmailController(req, res){
    try {
        const code = req.body

        const user = await UserModel.findOne({_id : code})

        if(!user){
            return res.status(400).json({
                message : 'Invalid code',
                error : true,
                success : false
            })
        }

        const updateUser = await UserModel.updateOne({_id : code},{
            verify_email : true
        })

        return res.json({
            message : 'Email verification done',
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : 'Internal server error',
            error : true,
            success : false
        })
    }
}


// login controller
export async function loginController(req, res){
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message : 'Please provide email and password',
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return res.status(400).json({
                message : 'User not register',
                error : true,
                success : false
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            return res.status(400).json({
                message : 'Check your password',
                error : true,
                success : false
            })
        }

        if(user.status !== 'Active'){
            return res.status(400).json({
                message : 'Contact to Admin',
                error : true,
                success : false
            })
        }

        const accessToken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        const cookieOption = {
            httpOnly : true,
            secure : true,
            sameSite : 'None'
        }

        res.cookie('accessToken', accessToken, cookieOption)

        res.cookie('refreshToken', refreshToken, {
            httpOnly : true,
            secure : true,
            sameSite : 'None'
        })

        res.status(200).json({
            message : 'login successfully',
            error : false,
            success : true,
            data : {
                accessToken,
                refreshToken
            }
        })
    } catch (error) {
        return res.status(500).json({
            message : 'Interval server error',
            error : true,
            success : false
        })
    }
}


// logout controller
export async function logoutController(req, res){
    try {
        const userId = req.userId;

        const cookieOption = {
            httpOnly : true,
            secure : true,
            sameSite : 'None'
        }

        res.clearCookie("accessToken", cookieOption)
        res.clearCookie("refreshToken", cookieOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
            refresh_token : ""
        })

        return res.json({
            message : 'logout successfully',
            error : false,
            success : true
        })
    } catch (error) {
        res.status(500).json({
            message : 'Interval server error',
            error : true,
            success : false
        })
    }
}


// upload user avater
export async function uploadAvatar(req, res) {
    try {
        const userId = req.userId  //auth middleware
        const image = req.file  //multer middleware
        const upload = await uploadImageCloudinary(image)

        await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url
        })
        
        return res.json({
            message : 'profile uploaded successfully',
            data : {
                _id : userId,
                avatar : upload.url
            },
            error : false,
            success : true
        })
    } catch (error) {
        res.status(500).json({
            message : 'Interval server error',
            error : true,
            success : false
        })
    }
}

// update user details
export async function updateUserDetails(req, res) {
    try {
        const userId = req.userId
        const { name, email, mobile, password } = req.body;

        let hashedPassword =  ''
        if(password){
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            ...(name && {name : name}),
            ...(email && {email : email}),
            ...(password && {password : hashedPassword}),
            ...(mobile && {mobile : mobile})
        },
        { new: true}
        )

        res.status(200).json({
            message : 'upadate successfully',
            error : false,
            success : true,
            data : updateUser
        })

    } catch (error) {
        res.status(500).json({
            message : 'Interval server error',
            error : true,
            success : false
        })
    }
}