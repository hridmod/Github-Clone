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

//ROUTES

app.get("/repo/:id", (req, res) => {
  Repo.findById(req.params.id, (err, foundrepo) => {
    if (err) {
      console.log(err);
    } else {
      res.send(foundrepo);
    }
  });
});

//DELETE ROUTE
//*********************SERVER*****************************
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

app.listen(port, (host) => {
  console.log("Server is listening!");
});
