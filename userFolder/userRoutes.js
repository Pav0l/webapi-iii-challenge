const express = require('express');
const Users = require('./userDb');
// import middlewares
const md = require('../middleware/middleware');
const Errors = require('../middleware/error');

// A router object is an isolated instance of middleware and routes. 
// You can think of it as a “mini-application,” capable only of performing middleware and routing functions
const routes = express.Router();

const upperCaseUsername = md.upperCaseUsername;

// Initialize the req.body object
routes.use(express.json());

// Provide routing to HTTP methods called to routes (/api/users) URL
routes.get('/', async (req, res, next) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch {
    next("Users information could not be retrieved.");;
  }
});

routes.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    const userPosts = await Users.getUserPosts(id);
    if (user) {
      res.status(200).json(userPosts);
    } else {
      // res.status(404).json({ message: `User with this ID ${id} does not exist` });
      next({ status: 404, message: `User with this ID ${id} does not exist` });
    }
  } catch {
    next("Server Error. User information could not be retrieved.");
  }
});

// Add custom middleware to upper case the name inside the req.body object
routes.post('/', upperCaseUsername, async (req, res, next) => {
  if (req.body.name) {
    try {
      const users = await Users.insert(req.body);
      res.status(200).json(users);
    } catch {
      next("Server Error. Could not create new user.");
    }
  } else {
    next({ status: 400, message: "Please provide name for the user." });
  }
});

routes.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await Users.remove(id);
    if (deletedUser > 0) {
      res.status(200).json({ message: `User with ID ${id} was deleted.` });
    } else {
      next({ status: 404, message: `User with this ID ${id} does not exist` });
    }
  } catch {
    next("Server Error. User information could not be retrieved.");
  }
});

// Add custom middleware to upper case the name inside the req.body object
routes.put('/:id', upperCaseUsername, async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) {
    try {
      const updatedUser = await Users.update(id, req.body);
      if (updatedUser > 0) {
        res.status(200).json({ message: `User with ID ${id} was edited.` });
      } else {
        next({ status: 404, message: `User with this ID ${id} does not exist` });
      }
    } catch {
      next("Server Error. User information could not be retrieved.");
    }
  } else {
    next({ status: 400, message: "Please provide name for the user." });
  }
});

// custom middleware to handle client error responses (status code 400+)
routes.use(Errors.clientError);

module.exports = routes;

/*
get(): calling find returns a promise that resolves to an array of all the resources contained in the database.
getById(): takes an id as the argument and returns a promise that resolves to the resource with that id if found.
insert(): calling insert passing it a resource object will add it to the database and return the new resource.
update(): accepts two arguments, the first is the id of the resource to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
getUserPosts(): that when passed a user's id, returns a list of all the posts for the user.
*/