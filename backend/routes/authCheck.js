const express = require('express')
const { Router } = require('express')
const { userSchema } = require('../models/User')
const jwt = require("jsonwebtoken")

const checkAuthRouter = Router()

// Remove userAuth middleware from this specific route
checkAuthRouter.get("/check", async (req, res) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "No token provided",
                authenticated: false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
        const user = await userSchema.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(200).json({
                success: false,
                message: "User not found",
                authenticated: false
            });
        }

        return res.status(200).json({
            success: true,
            message: "User authenticated",
            authenticated: true,
            data: user,
        });
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(200).json({ 
            success: false,
            message: "Invalid or expired token",
            authenticated: false
        });
    }
})

module.exports = {
    checkAuthRouter
}