const express = require('express');
let post = require('../controllers/posts');

const router = express.Router();

router.get('/', post.getPosts);
router.post('/', post.createPost);
router.patch('/:id/likePost', post.likePost);
router.patch('/:id', post.updatePost);
router.delete('/:id', post.deletePost);

module.exports = router;