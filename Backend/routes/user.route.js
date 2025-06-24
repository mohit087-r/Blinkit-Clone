import { Router } from 'express'
import { loginController, logoutController, registerController, verifyEmailController } from '../controllers/user.controller.js'
import auth from '../middleware/auth.js'
const userRouter = Router()

userRouter.post('/register', registerController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginController)
userRouter.get('/logout', auth, logoutController)

export default userRouter