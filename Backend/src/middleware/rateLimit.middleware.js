
import { rateLimit } from 'express-rate-limit'


// Auth limit controll
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        message:
            "Too many attempts. Please try again later."
    }

})
// product limit controll
export const productLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        message:
            "You reached maximum limit of request. Please try again later"
    }

})
export const OTPLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,

    message: {
        message:
            "Please wait for 10 minutes before requesting another OTP."
    }
});




