const forgotPasswordTemplate = ({name, otp}) => {
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
            <div style="max-width: 500px; margin: auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <h2 style="color: #333;">Password Reset Request</h2>
                <p>Dear <strong>${name}</strong>,</p>
                <p>You requested a password reset. Please use the following One-Time Password (OTP) to proceed:</p>
                <h1 style="text-align: center; color: #000; letter-spacing: 4px;">${otp}</h1>
                <p style="color: #666;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
                <p>If you did not request this, please ignore this email.</p>
                <p style="margin-top: 30px;">Regards,<br>The SnapBasket Team</p>
            </div>
        </div>
    `;
};

export default forgotPasswordTemplate