import { Router } from "express";
import { userLogin, userRegister, userLogout, getMe, sendOTP, verifyOTP, resetPassword } from "../controllers/auth.controller.js";
import { Protect } from "../middleware/protect.middleware.js";
import { loginLimiter, OTPLimiter } from "../middleware/rateLimit.middleware.js";

const route = Router()
route.post('/api/auth/register', userRegister)
route.post('/api/auth/login', loginLimiter, userLogin)
route.get('/api/auth/me', Protect, getMe)
route.post('/api/auth/logout', userLogout)

// forgot password

route.post('/api/auth/send-otp', OTPLimiter, sendOTP)
route.post('/api/auth/verify-otp', verifyOTP)
route.patch('/api/auth/reset-password', resetPassword)

export { route as authRoute }