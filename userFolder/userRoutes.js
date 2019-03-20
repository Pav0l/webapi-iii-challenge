const express = require('express');
const Users = require('./userDb');

const routes = express.Router();

// Initialize the req.body object
routes.use(express.json());

routes.get('/', async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ error: "The users information could not be retrieved."   });
  }
});



module.exports = routes;
