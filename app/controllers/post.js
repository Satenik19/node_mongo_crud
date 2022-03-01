import mongoose from 'mongoose';
import Post from '../models/post.js';

export async function createPost(req, res) {
    try {
        const user = await req.user;
        const post = new Post({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            created_date: new Date().getTime(),
            user: user._id
        });
        const newPost = await post.save();

        return res.status(200).json({
            success: true,
            post: newPost,
            message: 'New post created successfully',
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong.',
            error: e.message,
        });
    }
}

export async function getAllPosts(req, res) {
    try {
        const posts = await Post.find({ user: req.user._id });

        return res.status(200).json({
            success: true,
            posts,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: e.message,
        });
    }
}

export async function getPostById(req, res) {
    try {
        const post = await Post.findById(req.params.postId);

        res.status(200).json({
            success: true,
            post: post,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'This post does not exist',
            error: e.message,
        });
    }
}

export async function updatePost(req, res) {
    const id = req.params.postId;
    const dataToUpdate = req.body;
    try {
        await Post.updateOne({_id: id}, {$set: dataToUpdate});

        res.status(200).json({
            success: true,
            message: `Post is updated successfully`,
            updateCause: dataToUpdate,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: e.message,
        });
    }
}

export function deletePost(req, res) {
    const id = req.params.postId;
    Post.findByIdAndRemove(id)
        .exec()
        .then(()=> res.status(200).json({
            success: true,
        }))
        .catch((err) => res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err.message,
        }));
}