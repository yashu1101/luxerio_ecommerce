import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from "../models/user.model.js";
import { registerSchema, loginSchema, passwordSchema } from '../validations/auth.validation.js';
import cookieParser from 'cookie-parser';
import { transporter } from '../services/mailer.service.js';
import { OTP } from '../models/otp.model.js';




// controller for user register
export const userRegister = async (req, res) => {
    try {
        //  validate input
        const result = registerSchema.safeParse(req.body);

        if (!result.success) {

            return res.status(400).json({
                message: result?.error?.issues[0]?.message,
            });
        }
        console.log("Validation successful:", result.data);
        const { username, email, password } = result.data;

        //  check user exist
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exist!" });
        }

        //  hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //  create user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        //  remove password
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: "You have been registered.",
            data: userResponse,
        });

    } catch (error) {
        console.log("User not created:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// controller for user login

export const userLogin = async (req, res) => {
    try {
        // validate input
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: result.error.errors[0].message,
            });
        }

        const { email, password } = result.data;

        // check user exist or not 
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials!" });
        // match user password
        const hashedPassword = user.password
        const isMatch = await bcrypt.compare(password, hashedPassword)
        if (!isMatch) return res.status(401).json({ message: "Invalid crendentials!" })
        // generate jwt token 

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY)


        // jwt token store in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
            maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days

        })
            .status(200)
            .json({
                message: "Login successful",

            });




    } catch (error) {

        res.status(500).json({ message: error.message })
        console.log("Login error:", error)
    }


}

// controller for get info of loggedIn user 

export const getMe = async (req, res) => {
    try {
        res.json({
            user: {
                _id: req.user._id,
                username: req.user.username,
                email: req.user.email,
                role: req.user.role,
                createdAt: req.user.createdAt
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// controller for user Logout

export const userLogout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        }).status(200).json({ message: "You have been logged out." });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ---------------------Forgot Password---------------------



// step 1: send OTP to user email
export const sendOTP = async (req, res) => {



    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const generatedOtp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        await transporter.sendMail({


            from: `"Luxerio Support" <${process.env.APP_USER}>`,

            to: email,

            subject: "Reset Password OTP",
            text: `Your OTP for password reset is: ${generatedOtp}. It is valid for 10 minutes.`

        });

        await OTP.deleteMany({ email });

        await OTP.create({
            email,
            otp: generatedOtp
        });

        res.status(201).json({
            message: "OTP sent successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// step 2: verify OTP

export const verifyOTP = async (req, res) => {

    try {

        const { email, userOtp } = req.body;

        const savedOtp = await OTP.findOne({ email });

        // check if otp exists

        if (!savedOtp) {

            return res.status(404).json({
                message: "OTP not found or expired."
            });

        }

        // check if otp is correct

        if (userOtp !== savedOtp.otp) {

            return res.status(401).json({
                message: "Invalid OTP!"
            });

        }

        // mark otp as verified

        await OTP.findOneAndUpdate(
            { email },
            { isVerified: true }
        );

        res.status(200).json({
            message: "OTP verified successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// step 3: reset password



export const resetPassword = async (req, res) => {

    try {

        //    validate body data

        const { email } = req.body
        const result = passwordSchema.safeParse(req.body)
        if (!result.success) {

            return res.status(400).json({
                message: result?.error?.issues[0]?.message,
            });
        }
        console.log("Validation successful:", result.data);
        const { password } = result.data;

        // check if otp is verified

        const isOtpVerified = await OTP.findOne({ email });

        if (
            !isOtpVerified ||
            !isOtpVerified.isVerified
        ) {

            return res.status(401).json({
                message: "OTP verification required!"
            });

        }

        // hash new password

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // update password

        await User.findOneAndUpdate(
            { email },
            { password: hashedPassword }
        );

        // delete otp after successful reset

        await OTP.deleteMany({ email });

        res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};