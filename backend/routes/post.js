const express = require('express')
const { Router } = require('express')
const { z, success } = require('zod')
const { userAuth, JWT_USER_SECRET } = require('../controllers/Auth')
const { userSchema } = require('../models/User')
const { postSchema } = require('../models/Posts')
const jwt = require('jsonwebtoken')

const app = express()
const postRouter = Router()
app.use(express.json())


const optionalAuth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            const decoded = jwt.verify(token, JWT_USER_SECRET);
            req.userId = decoded.id;
        }
        next();
    } catch (e) {
        next();
    }
};

postRouter.post('/create-post', userAuth, async (req, res) => {
    const createdBy = req.userId
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
        const user = await userSchema.findById(createdBy).select('name')
        const creatorName = user.name
        const newPost = await postSchema.create({
            title,
            body,
            tags: postTags,
            createdBy,
            creatorName
        })
        await userSchema.updateOne({
            _id: createdBy
        }, {
            "$push": {
                postsCreated: newPost._id
            }
        })
        res.status(201).json({
            success: true,
            message: "Post Created successfully",
            data: newPost
        })
    } catch (e) {
        console.error("Post Creation error:", e)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})
postRouter.put('/update-post', userAuth, async (req, res) => {
    const createdBy = req.userId
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
postRouter.get('/all-posts', optionalAuth, async (req, res) => {
    try {
        const userId = req.userId;
        const posts = await postSchema.find({});


        const postsWithLikeStatus = posts.map(post => ({
            ...post.toObject(),
            isLiked: userId && post.likedBy && post.likedBy.includes(userId)
        }));

        res.json({
            success: true,
            data: postsWithLikeStatus
        });
    } catch (e) {
        console.error("Fetch posts error:", e);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
})
postRouter.patch('/like-post/:postId', userAuth, async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId;

    try {
        const likedPost = await postSchema.findOneAndUpdate(
            {
                _id: postId,
                likedBy: { $ne: userId }
            },
            {
                $inc: { likes: 1 },
                $addToSet: { likedBy: userId }
            },
            { new: true }
        );

        if (likedPost) {
            return res.status(200).json({
                success: true,
                message: "Post liked",
                data: {
                    likes: likedPost.likes,
                    isLiked: true
                }
            });
        }

        const unlikedPost = await postSchema.findOneAndUpdate(
            {
                _id: postId,
                likedBy: userId
            },
            {
                $inc: { likes: -1 },
                $pull: { likedBy: userId }
            },
            { new: true }
        );

        if (unlikedPost) {
            return res.status(200).json({
                success: true,
                message: "Post unliked",
                data: {
                    likes: unlikedPost.likes,
                    isLiked: false
                }
            });
        }
        return res.status(404).json({
            success: false,
            message: "Post not found"
        });

    } catch (e) {
        console.error("Like/Unlike error:", e);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
postRouter.patch('/increment-view/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const updatedPost = await postSchema.findByIdAndUpdate(
            postId,
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.json({ success: true, data: updatedPost.views });
    } catch (e) {
        console.error("Increment view error:", e);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
postRouter.delete('/delete-post/:postId', userAuth, async (req, res) => {
    try {
        const { postId } = req.params;
        const deletePost = await postSchema.deleteOne({_id: postId});

        if (!deletePost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        // Remove post from user's postsCreated array
        await userSchema.updateOne(
            { _id: req.userId },
            { $pull: { postsCreated: postId } }
        );
        res.json({
            success: true,
            data: deletePost
        })
    } catch (error) {
        console.error("Increment view error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


module.exports = {
    postRouter
}