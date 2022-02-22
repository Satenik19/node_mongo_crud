import mongoose from 'mongoose';
import User from '../models/user.js';

export function createUser(req, res) {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        phone_number: req.body.phoneNumber,
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
