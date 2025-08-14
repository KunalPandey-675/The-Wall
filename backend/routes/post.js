const express = require('express')
const { Router } = require('express')
const { z } = require('zod')
const { userAuth } = require('../controllers/Auth')
const { userSchema } = require('../models/User')
const { postSchema } = require('../models/Posts')

const app = express()
const postRouter = Router()
app.use(express.json())

postRouter.post('/create-post', userAuth, async (req, res) => {
    createdBy = req.userId
    const requiredBody = z.object({
        title: z.string().min(3).max(100),
        body: z.string().min(10).max(200),
        tags: z.string()
    })

    const parsedData = requiredBody.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid Format",
            error: parsedData.error
        })
    }
    const { title, body, tags } = req.body
    const postTags = tags.split(',')
    try {
        const newPost = await postSchema.create({
            title,
            body,
            tags: postTags,
            createdBy
        })
        await userSchema.updateOne({
            _id: createdBy
        }, {
            "$push": {
                postsCreated: newPost._id
            }
        })
        res.status(201).json({
            message: "Post Created successfully"
        })
    } catch (e) {
        console.error("Post Creation error:", e)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})
postRouter.put('/update-post', userAuth, async (req, res) => {
    createdBy = req.userId
    const requiredBody = z.object({
        title: z.string().min(3).max(100),
        body: z.string().min(10).max(200),
        tags: z.string(),
        postId: z.string()
    })

    const parsedData = requiredBody.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid Format",
            error: parsedData.error
        })
    }
    const { title, body, tags, postId } = req.body
    const postTags = tags.split(',')
    try {
        const searchResponse = await postSchema.findOne({
            _id: postId,
            createdBy
        })
        if (!searchResponse) {
            return res.status(404).json({
                message: "Post not found or you don't have permission to update it"
            })
        }
        await postSchema.updateOne({
            _id: postId
        }, {
            title,
            body,
            tags: postTags,
            createdBy
        })
        res.status(201).json({
            message: "Post Updated successfully"
        })
    } catch (e) {
        console.error("Post Updation error:", e)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})


module.exports = {
    postRouter
}