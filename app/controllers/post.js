import mongoose from 'mongoose';
import Post from '../models/post.js';

export function createPost(req, res) {
    console.log(req.body.title, 'title');
    console.log( new Date().getTime(), 'description');
    const post = new Post({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        created_date: new Date().getTime(),
    });
    return post
        .save()
        .then((newPost) => {
            return res.status(200).json({
                success: true,
                message: 'New post created successfully',
                post: newPost,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Something went wrong.',
                error: error.message,
            });
        });
}

export function getAllPosts(req, res) {
    return Post.find()
    .then((allPosts) => {
        return res.status(200).json({
            success: true,
            posts: allPosts,
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        });
    });
}

export function getPostById(req, res) {
    Post.findById(req.params.postId)
        .then((post) => {
            res.status(200).json({
                success: true,
                post: post,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This post does not exist',
                error: err.message,
            });
        });
}


export function updatePost(req, res) {
    // const id = req.params.postId;
    const id = req.body.id;
    delete req.body.id;
    const dataToUpdate = req.body;
    console.log(dataToUpdate, '----');
    console.log(id, 'id');
    Post.updateOne({ _id: id }, { $set: dataToUpdate })
        .then(() => {
            res.status(200).json({
                success: true,
                message: `Post is updated successfully`,
                updateCause: dataToUpdate,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: err.message,
            });
        });
}

export function deletePost(req, res) {
    const id = req.params.postId;
    Post.findByIdAndRemove(id)
        .exec()
        .then(()=> res.status(204).json({
            success: true,
        }))
        .catch((err) => res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err.message,
        }));
}