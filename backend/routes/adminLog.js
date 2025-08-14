const express= require('express')
const {Router}= require('express')
const { z } = require('zod')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { adminAuth, JWT_ADMIN_SECRET } = require('../controllers/Auth')
const { adminSchema } = require('../models/Admin')

const app = express()
const adminLogRouter = Router()
app.use(express.json())

adminLogRouter.post('/sign-up', async (req, res) => {
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(6).max(15),
        firstName: z.string().min(3).max(50),
        lastName: z.string().min(3).max(50)
    })

    const parsedData = requiredBody.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid Format",
            error: parsedData.error
        })
    }
    const { email, firstName, lastName, password } = req.body

    try {
        const existingUser = await adminSchema.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const hashedPass = await bcrypt.hash(password, 10)
        await adminSchema.create({
            email,
            password: hashedPass,
            firstName,
            lastName
        })

        res.status(201).json({
            message: "User signed up successfully"
        })
    } catch (e) {
        console.error("Sign-up error:", e)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})


adminLogRouter.post("/sign-in", async (req, res) => {
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
        const user = await adminSchema.findOne({ email })
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
        }, JWT_ADMIN_SECRET, {
            expiresIn: "4h",
        })
        adminSchema.token = token
        await adminSchema.save()
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.json({
            message: "Signed in successfully",
            token
        })
    } catch (e) {
        console.error("Sign-in error:", e)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

module.exports={
    adminLogRouter
}