const Repository = require("../models/Repo");
const User = require("../models/User");

exports.getRepo = async (req, res) => {
  try {
    let repository = await Repository.find({}).populate("User", "User").exec();
    await res.send(repository);
  } catch (err) {
    console.error(err);
  }
};

exports.createRepo = async (req, res) => {
  try {
    const newRepo = await new Repository({
      Name: req.body.Name,
      Contributors: req.body.Contributors,
    });

    await newRepo.save(function (err) {
      if (err) return handleError(err);
    });
    res.redirect("/repos");
  } catch (err) {
    console.log(err);
  }
};

exports.getRepoById = async (req, res) => {
  const foundRepo = await Repository.findById(req.params._id);
  res.send(foundRepo);
};

exports.updateRepo = async (req, res) => {
  try {
    const updatedUser = await Repository.update(
      { _id: req.params.id },
      { $set: { Name: req.body.Name, numStars: 5 } }
    );
    await res.send(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteRepo = async (req, res) => {
  try {
    await Repository.findByIdAndRemove(req.params.id);
    res.send("deleted");
  } catch (err) {
    console.error(err);
  }
};
