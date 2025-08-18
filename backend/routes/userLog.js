const express = require('express')
const { Router } = require('express')
const { z, success } = require('zod')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { userAuth, JWT_USER_SECRET } = require('../controllers/Auth')
const { userSchema } = require('../models/User')
const { otpSchema } = require('../models/OTP')
const otpGenerator = require('otp-generator');
const { postSchema } = require('../models/Posts')

const app = express()
const userLogRouter = Router()
app.use(express.json())


userLogRouter.post('/send-otp', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userSchema.findOne({ email }); // Fix: use userSchema, not User
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            });
        }

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let existingOtp = await otpSchema.findOne({ otp });
        while (existingOtp) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            existingOtp = await otpSchema.findOne({ otp });
        }

        const response = await otpSchema.create({ email, otp });

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            data: response
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Error while sending OTP",
        });
    }
});

userLogRouter.post('/sign-up', async (req, res) => {
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(6).max(15),
        name: z.string().min(3).max(100),
        // otp: z.number()
    })

    const parsedData = requiredBody.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid Format",
            error: parsedData.error
        })
    }
    const { email, name, password, otp } = req.body

    try {
        const existingUser = await userSchema.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const recentOtp = await otpSchema.findOne({ email }).sort({ createdAt: -1 });
        if (!recentOtp || String(recentOtp.otp) !== String(otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP",
            });
        }

        const maxAge = 10 * 60 * 1000; // 10 minutes
        const timeDiff = Date.now() - new Date(recentOtp.createdAt).getTime();
        if (timeDiff > maxAge) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired",
            });
        }
        const hashedPass = await bcrypt.hash(password, 10)
        const profilePic = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;
        const newUser = await userSchema.create({
            email,
            password: hashedPass,
            name,
            profilePic
        })
        const token = jwt.sign({
            id: newUser._id
        }, JWT_USER_SECRET, {
            expiresIn: "4h",
        })
        newUser.token = token
        await newUser.save()
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-origin in production
        });
        res.status(201).json({
            success: true,
            message: "User signed up successfully",
            data: newUser
        })
    } catch (e) {
        console.error("Sign-up error:", e)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})



userLogRouter.post("/sign-in", async (req, res) => {
    const loginSchema = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(6).max(15),
    })

    const parsedData = loginSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid Format",
            error: parsedData.error
        })
    }

    const { email, password } = req.body

    try {
        const user = await userSchema.findOne({ email })
        if (!user) {
            return res.status(403).json({
                message: "Invalid credentials"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(403).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({
            id: user._id
        }, JWT_USER_SECRET, {
            expiresIn: "4h",
        })
        user.token = token
        await user.save()
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-origin in production
        });
        res.json({
            success: true,
            message: "Signed in successfully",
            token,
            data: user
        })
    } catch (e) {
        console.error("Sign-in error:", e)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

userLogRouter.post("/logout", async (req, res) => {
    try {
        // Clear the cookie with multiple attempts to ensure it's removed
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        };

        // Clear cookie with the same options used when setting it
        res.clearCookie("jwt", cookieOptions);
        
        // Also try clearing without the domain specification
        res.clearCookie("jwt", {
            ...cookieOptions,
            domain: undefined
        });

        // Set an expired cookie as a fallback
        res.cookie("jwt", "", {
            ...cookieOptions,
            expires: new Date(0),
            maxAge: 0
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

userLogRouter.get('/my-posts', userAuth, async (req, res) => {
    try {
        const userId = req.userId;

        const user = await userSchema.findOne({
            _id: userId
        })
        const posts = user.postsCreated

        const postData = await postSchema.find({
            _id: { $in: posts }
        })

        res.json({
            success: true,
            data: postData,
            count: postData.length // Add post count
        })
    } catch (error) {
        console.error('my-posts error', error)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})
module.exports = {
    userLogRouter
}