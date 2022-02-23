import mongoose from 'mongoose';
import User from '../models/user.js';

export function createUser(req, res) {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
    });
    return user
        .save()
        .then((newUser) => {
            return res.status(200).json({
                success: true,
                message: 'New user created successfully',
                post: newUser,
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

export function login(req, res, next) {
    res.status(200).json(req.user);
    return next();
}