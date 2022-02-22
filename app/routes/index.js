import express from 'express';
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost
} from '../controllers/post.js';
import { createUser } from '../controllers/user.js';

const router = express.Router();

router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:postId', getPostById);
router.put('/posts/:postId', updatePost);
router.delete('/posts/:postId', deletePost);

router.post('/users', createUser);

export default router;