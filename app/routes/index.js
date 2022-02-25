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

router.post('/posts', createPost);
router.get('/posts', authJwt, getAllPosts);
router.get('/posts/:postId', getPostById);
router.put('/posts/:postId', updatePost);
router.delete('/posts/:postId', deletePost);

// router.post('/users', createUser);
router.post('/login', authLocal, login);
router.post('/register', createUser);
router.get('/hello', authJwt, (req, res) => {
    res.send('This is a private route');
})

export default router;