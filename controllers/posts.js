const mongoose = require('mongoose');
const postMessage = require('../models/postMessage.js');

const getPosts = async (req, res) => {
    try {
        const postMessages = await postMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new postMessage(post);
    try {
        newPost.save(newPost);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
const updatePost = async (req, res) => {
    const post = req.body;
    const { id: _id } = req.params;
    console.log(post.creator);
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('no post with tat is');
    const updatedPost = await postMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
}
const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('no post with tat is');

    await postMessage.findByIdAndRemove(_id);
    res.json('post deleted successfully');
}
const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('no post with tat is');

    const post = await postMessage.findById(_id);
    const updatepost = await postMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });
    res.json(updatepost);
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost
}