const mongoose = require("mongoose")
const Schema = mongoose.Schema

const user = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    profilePic: { type: String, default: "" },
    postsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
    token: { type: String, default: "" }

});


const userSchema = mongoose.model("Users", user)

module.exports = {
    userSchema
}
