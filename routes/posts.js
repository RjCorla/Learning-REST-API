const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

// GET POSTS
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();

    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

// SUBMIT POST
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savePost = await post.save();
    res.json(savePost);
  } catch (error) {
    res.json({ message: error });
  }
});

// SPECIFIC POST
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});

// DELETE POST
router.delete('/:postId', async (req, res) => {
  try {
    const removePost = await Post.remove({ _id: req.params.postId });

    res.json(removePost);
  } catch (error) {
    res.json({ message: error });
  }
});

// UPDATE POST
router.patch('/:postId', async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );

    res.json(updatePost);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
