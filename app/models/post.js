import mongoose from 'mongoose';
const { Schema } = mongoose;

// mongoose.Promise = global.Promise;
const postSchema = new Schema({
    _id:Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created_date: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default mongoose.model('Post', postSchema);