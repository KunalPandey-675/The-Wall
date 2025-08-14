const mongoose = require("mongoose")
const Schema = mongoose.Schema


const admin = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePic: { type: String, default: "" },
    token: { type: String, default: "" }
})
const adminSchema = mongoose.model("Admin", admin)

module.exports={
    adminSchema
}