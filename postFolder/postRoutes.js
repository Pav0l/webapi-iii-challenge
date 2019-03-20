const express = require('express');
const Posts = require('./postDb');

const routes = express.Router();

// Initialize the req.body object
routes.use(express.json());

routes.get('/', async (req, res) => {
  try {
    const posts = await Posts.get();
    res.status(200).json(posts);
  } catch {
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});



module.exports = routes;
