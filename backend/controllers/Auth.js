const jwt = require("jsonwebtoken")
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET
const JWT_USER_SECRET = process.env.JWT_USER_SECRET

const userAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        const response = jwt.verify(token, JWT_USER_SECRET)
        req.userId = response.id
        next()
    } catch (err) {
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }
}   

const adminAuth = (req, res, next) => {
    const token = req.headers.token
    try {
        const response = jwt.verify(token, JWT_ADMIN_SECRET)
        req.userId = response.id
        next()
    } catch (err) {
        res.status(403).json({
            message: "Invalid Credentials",
        })
    }
}
module.exports = {
    userAuth,
    adminAuth,
    JWT_ADMIN_SECRET,
    JWT_USER_SECRET
}