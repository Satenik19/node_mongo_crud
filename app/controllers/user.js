import mongoose from 'mongoose';
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