import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt, { compareSync, hashSync } from 'bcrypt';
const { Schema } = mongoose;

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        trim: true,
        minlength: [6, 'Password need to be longer!']
    },
    // posts: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Post',
    //     }
    // ]

});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    return next();
});

UserSchema.methods = {
    _hashPassword(password) {
        return hashSync(password);
    },
    authenticateUser(password) {
        return compareSync(password, this.password);
    },
    createToken() {
        return jwt.sign(
            {
                _id: this._id,
            },
            process.env.JWT_SECRET,
        );
    },
    toAuthJSON() {
        //
    },
    toJSON() {
        return {
            _id: this._id,
            email: this.email,
            token: `JWT ${this.createToken()}`,
        };
    },
};

export default mongoose.model('User', UserSchema);