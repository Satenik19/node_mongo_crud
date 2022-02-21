import express from 'express';
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost
} from '../controllers/post.js';

const router = express.Router();
router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:postId', getPostById);
router.patch('/posts/:postId', updatePost);
router.delete('/posts/:postId', deletePost);

export default router;