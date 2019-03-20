const express = require('express');
const Posts = require('./postDb');

const routes = express.Router();

// Initialize the req.body object
routes.use(express.json());

routes.get('/', async (req, res, next) => {
  try {
    const posts = await Posts.get();
    res.status(200).json(posts);
  } catch {
    next({ message: "Posts could not be retrieved." });
  }
});

routes.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Posts.getById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post with this ID does not exist" });
    }
  } catch {
    next("Server Error. Post information could not be retrieved.");
  }
});

routes.post('/', async (req, res, next) => {
  if (req.body.text && req.body.user_id) {
    try {
      const posts = await Posts.insert(req.body);
      res.status(200).json(posts);
    } catch {
      next("Server Error. Could not create new post.");
    }
  } else {
    res.status(400).json({ error: "Please provide text and user_id for the post." })
  }
});

routes.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPost = await Posts.remove(id);
    if (deletedPost > 0) {
      res.status(200).json({ message: `Post with ID ${id} was deleted.` });
    } else {
      res.status(404).json({ error: `Post with ID ${id} does not exist` });
    }
  } catch {
    next("Server Error. Post information could not be retrieved.");
  }
});

routes.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (req.body.text) {
    try {
      const postToUpdate = await Posts.getById(id);
      // allow the user to update only text of the post
      const updatedPost = await Posts.update(id, {...postToUpdate, text: req.body.text});
      if (updatedPost > 0) {
        res.status(200).json({ message: `Post with ID ${id} was edited.` });
      } else {
        res.status(404).json({ error: `Post with ID ${id} does not exist` });
      }
    } catch {
      next("Server Error. Post information could not be retrieved.");
    }
  } else {
    res.status(400).json({ error: "Please provide text for the post." })
  }
});


module.exports = routes;
