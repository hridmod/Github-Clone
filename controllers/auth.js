const { uservalidation, loginValidation } = require("../validation/valid");
const user = require("../models/User");
const jwt = require("jsonwebtoken");
const Repository = require("../models/Repo");
const User = require("../models/User");
exports.login = async (req, res) => {
  try {
    const { error } = await loginValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({ Email: req.body.Email });
    if (!user) return res.status(400).send("Email already Exist");
    //AUTH
    const token = await jwt.sign({ _id: user._id }, "Secret");
    res.header("auth-token", token).send(token);
  } catch (err) {
    console.log(err);
  }
};
