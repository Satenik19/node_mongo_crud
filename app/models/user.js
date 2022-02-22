import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    // posts: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Post',
    //     }
    // ]

});

export default mongoose.model('User', userSchema);