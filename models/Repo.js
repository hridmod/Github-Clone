const mongoose = require("mongoose");
const User = require("./User.js");
const RepoSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  CreatedOn: {
    type: Date,
    default: Date.now,
  },
  User: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  numStars: Number,
  numFork: Number,
  Contributors: String,
  lastModifiedAt: {
    type: String,
    default: new Date().toString().split(" ").splice(0, 5).join(" "),
  },
  accessedBy: {
    type: String,
    default: "private",
  },
});
const Repo = mongoose.model("Repo", RepoSchema);
module.exports = Repo;
