const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId


const post = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [],
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    createdBy: { type: ObjectId, ref: "User", required: true },
}, {
    timestamps: true
})
const postSchema = mongoose.model("Posts", post)

module.exports = {
    postSchema
}