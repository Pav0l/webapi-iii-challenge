const express = require('express');
// import all routes middlewares
const userRoute = require('./userFolder/userRoutes');
const postRoute = require('./postFolder/postRoutes');
// import error middlewares
const Errors = require('./middleware/error');

// create an instance of express app
const app = express();
// save routes URL
const userUrl = '/api/users';
const postUrl = '/api/posts';

// Mount route middleware functions to specific paths
app.use(userUrl, userRoute);
app.use(postUrl, postRoute);

// Mount server error response middleware
app.use(Errors.serverError);
module.exports = app;
