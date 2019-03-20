const express = require('express');
const userRoute = require('./userFolder/userRoutes');
const postRoute = require('./postFolder/postRoutes');

const app = express();
// routes URL
const userUrl = '/api/users';
const postUrl = '/api/posts';

// Mount route middleware functions to specific paths
app.use(userUrl, userRoute);
app.use(postUrl, postRoute);


module.exports = app;
