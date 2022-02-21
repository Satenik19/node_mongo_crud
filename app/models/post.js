import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    }
});
export default mongoose.model('Post', postSchema);