const express = require('express')
const { Router } = require('express')
const { userSchema } = require('../models/User')
const { userAuth } = require('../controllers/Auth')

const app = express()
const checkAuthRouter = Router()
app.use(express.json())

checkAuthRouter.get("/check", userAuth, async (req, res) => {
    try {
        const user = await userSchema.findById(req.userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User authenticated",
            data: user,
        });
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" 
        });
    }
})

module.exports = {
    checkAuthRouter
}