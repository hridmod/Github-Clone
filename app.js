/* eslint-disable no-undef */

const express = require('express');
const app = express();

// Middleware
app.use(express.static('public'));

//DATABSE CONNECTION
const DBconnection = require('./config/connect');
DBconnection();
//body parser
app.use(express.json());
//ROUTES
app.use(require('./routes/repository.js'));
app.use(require('./routes/auth.js'));
app.use(require('./routes/user.js'));

//*********************SERVER*****************************
const port = process.env.PORT || 8080;

// eslint-disable-next-line no-unused-vars
const host = process.env.HOST || 'localhost';

// eslint-disable-next-line no-unused-vars
app.listen(port, (host) => {
  console.log('Server is listening!');
});
