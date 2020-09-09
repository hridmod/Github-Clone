const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./models/User");
const Repo = require("./models/Repo");

// Middleware
app.use(express.static("public"));

//DATABSE CONNECTION
const DBconnection = require("./config/connect");
DBconnection();
//body parser
app.use(express.json());
//ROUTES
app.use(require("./routes/repository.js"));
app.use(require("./routes/user.js"));

//DELETE ROUTE
//*********************SERVER*****************************
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

app.listen(port, (host) => {
  console.log("Server is listening!");
});
