import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

export async function createUser(req, res) {
    try {
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            birthday: req.body.birthday,
            password: req.body.password,
        });
        const newUser = await user.save();
        return res.status(200).json({
            success: true,
            message: 'New user created successfully',
            user: newUser,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong.',
            error: e.message,
        });
    }
}

export function login(req, res, next) {
    res.status(200).json(req.user);
    return next();
}

export async function changePassword(req, res) {
    try {
        const userId = req.user._id;
        const hash = await bcrypt.hash(req.body.password, 10);
        await User.updateOne(
            {_id: userId},
            {$set: {password: hash}}
        );
        return res.status(200).json({
            success: true,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong.',
            error: e.message,
        });
    }
}

export async function uploadCover(req, res) {
    try {
        const file = req.file;
        console.log( req.user, 'image');
        const fileData = file.originalname.split('.');
        const fileName = fileData[0];
        const fileExt = fileData.pop();
        const coverPhotoName= `${fileName}${req.user._id}.${fileExt}`;
        if (file) {
            await User.updateOne({_id: req.user._id}, {$set: { cover: coverPhotoName }});
        }
        // res.send(req.file)
        return res.status(200).json({
            success: true,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong.',
            error: e.message,
        });
    }
}