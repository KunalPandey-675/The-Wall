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
const {userAuth}= require('./controllers/Auth')

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use("/api/user", userLogRouter)
app.use("/api/admin", adminLogRouter)
app.use("/api/post", postRouter)
app.use("/api/auth", userAuth,checkAuthRouter)


app.get("/", (req, res) => {
    res.json({
        message: "hello world!!"
    })
})
app.use(express.static(path.join(__dirname, '../frontend/dist')));


async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server running on address http://localhost:${PORT}`);
    });
}
main()