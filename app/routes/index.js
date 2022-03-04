import express from 'express';
import multer from 'multer';

import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost
} from '../controllers/post.js';
import { createUser, login, changePassword, uploadCover } from '../controllers/user.js';
import {
    authJwt,
    authLocal
} from '../services/auth.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './app/uploads')
    },
    filename: function (req, file, cb) {
        const fileData = file.originalname.split('.');
        const fileName = fileData[0];
        const fileExt = fileData.pop();
        cb(null, `${fileName}${req.user._id}.${fileExt}`);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();
router.post('/change-password', authJwt, changePassword);
router.post('/upload-cover', authJwt, upload.single('image'), uploadCover);

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