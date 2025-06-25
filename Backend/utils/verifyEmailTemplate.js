const verifyEmailTemplate = ({ name, url }) => {
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 500px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h2 style="color: #333;">Welcome to SnapBasket!</h2>
                <p>Dear <strong>${name}</strong>,</p>
                <p>Thank you for registering with SnapBasket. Please click the button below to verify your email address and activate your account:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${url}" style="text-decoration: none; padding: 12px 24px; background-color: orange; color: black; font-weight: bold; border-radius: 6px; display: inline-block;">
                        Verify Email
                    </a>
                </div>
                <p>If the button above doesn’t work, copy and paste this URL into your browser:</p>
                <p style="word-break: break-all;"><a href="${url}">${url}</a></p>
                <p style="margin-top: 30px;">Regards,<br>The SnapBasket Team</p>
            </div>
        </div>
    `;
};

export default verifyEmailTemplate;
