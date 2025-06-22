import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()


const generateRefreshToken= async (userId) => {
    const token = await jwt.sign(
        { id: userId }, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" }
    )
    
    const updateRefreshTokenUser = await UserModel.updateOne(
        { _id : userId },
        {
            refresh_token : token
        }
    )

    return token
}

export default generateRefreshToken