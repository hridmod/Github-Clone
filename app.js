const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./models/User");
const Repo = require("./models/Repo");
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));

//DATABSE CONNECTION
const DBconnection = require("./config/connect");
DBconnection();

//Sample

//ROUTES
app.get("/repo", (req, res) => {
  Repo.find({})
    .populate("User", "User")
    .exec()

    .then((repos) => {
      res.send(repos);
    });
});
app.get("/user", (req, res) => {
  User.find({})
    .populate("Repo")
    .exec()

    .then((user) => {
      res.send(user);
    });
});

app.post("/repo", (req, res) => {
  const Hriday = new User({
    //Take from form with req.body ideally
    User: "hridmod",
    PhoneNo: 9999999,
    FirstName: "Hriday",
  });

  Hriday.save((err) => {
    if (err) return handleError(err);

    const repo1 = new Repo({
      Name: "Task1",
      User: Hriday._id,
      // assign the _id from the user
    });

    repo1.save(function (err) {
      if (err) return handleError(err);
    });
  });
  console.log(req.body);
  res.redirect("/repo");
});
app.get("/repo/:id", (req, res) => {
  Repo.findById(req.params.id, (err, foundrepo) => {
    if (err) {
      console.log(err);
    } else {
      res.send(foundrepo);
    }
  });
});
//Update Route
app.put("/repo/:id", (req, res) => {
  Repo.update(
    { _id: req.params.id },
    { $set: { Name: "Unicode", numStars: 5 } },
    (err, updatedBlog) => {
      if (err) {
        console.log(err);
      } else {
        res.send(updatedBlog);
      }
    }
  );
});
//DELETE ROUTE
app.delete("/repo/:id", (req, res) => {
  Repo.findByIdAndRemove(req.params.id, () => {
    res.send("deleted");
  });
});
//*********************SERVER*****************************
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

app.listen(port, (host) => {
  console.log("Server is listening!");
});
