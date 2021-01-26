const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: new Date()
    }
});
const postMessage = mongoose.model('postMessage', postSchema);

module.exports = postMessage;