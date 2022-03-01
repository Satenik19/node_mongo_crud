import express from 'express';
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost
} from '../controllers/post.js';
import { createUser, login } from '../controllers/user.js';
import {
    authJwt,
    authLocal
} from '../services/auth.js';

const router = express.Router();

router.post('/posts', authJwt, createPost);
router.get('/posts', authJwt, getAllPosts);
router.get('/posts/:postId', authJwt, getPostById);
router.put('/posts/:postId', authJwt, updatePost);
router.delete('/posts/:postId', authJwt, deletePost);

// router.post('/users', createUser);
router.post('/login', authLocal, login);
router.post('/register', createUser);
router.get('/hello', authJwt, (req, res) => {
    res.send('This is a private route');
})

export default router;