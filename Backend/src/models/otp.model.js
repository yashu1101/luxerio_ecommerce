import mongoose from "mongoose";



const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    otp: {
        type: String,
        required: true,

    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 600

    },
    isVerified: {
        type: Boolean,
        default: false

    }
}, { timestamps: true })

export const OTP = mongoose.model('OTP', otpSchema)  