const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  User: {
    type: String,
    maxlength: 15,
    required: true,
    immutable: true,
  },
  Password: {
    type: String,
    minlength: 6,
  },
  FirstName: String,
  LastName: String,
  Email: String,
  PhoneNo: Number,
  Age: Number,
  repos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Repo",
  },
  Contributions: String,
});

module.exports = mongoose.model("User", UserSchema);
