const User = require("../models/User");
const { uservalidation, loginValidation } = require("../validation/valid");
const bcrypt = require("bcryptjs");
exports.getUser = async (req, res) => {
  try {
    let user = await User.find({});
    await res.send(user);
  } catch (err) {
    console.error(err);
  }
};
exports.createUser = async (req, res) => {
  //Validation
  const { error } = uservalidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.Password, salt);
  try {
    const newUser = new User({
      FirstName: req.body.FirstName,
      User: req.body.User,
      Password: hashedPassword,
      Email: req.body.Email,
    });

    await newUser.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    await res.redirect("/user");
  } catch (err) {
    console.log(err);
  }
};
