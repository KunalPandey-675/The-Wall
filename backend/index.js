require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser");
const cors = require("cors")
const path = require("path")

const app = express();
app.use(cookieParser());

const { userLogRouter } = require("./routes/userLog")
const { adminLogRouter } = require("./routes/adminLog");

const { postRouter } = require("./routes/post")
const { checkAuthRouter } = require("./routes/authCheck")
const { userAuth } = require('./controllers/Auth')

app.use(express.json())

// Single CORS configuration - remove the duplicate
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            "http://localhost:5173",
            "https://the-wall-five.vercel.app",
            "https://the-wall-backend.onrender.com"
        ];
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    exposedHeaders: ['*', 'Authorization']
}));

app.use("/api/user", userLogRouter)
app.use("/api/admin", adminLogRouter)
app.use("/api/post", postRouter)
app.use("/api/auth", userAuth, checkAuthRouter)

app.get("/", (req, res) => {
    res.json({
        message: "hello world!!"
    })
})

app.use(express.static(path.join(__dirname, '../frontend/dist')));

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
main()