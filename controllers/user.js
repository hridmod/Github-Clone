const User = require("../models/User");
exports.getUser = async (req, res) => {
  try {
    let user = await User.find({});
    await res.send(user);
  } catch (err) {
    console.error(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await new User({
      firstName: req.body.firstName,
      User: req.body.User,
    });

    newUser.save(function (err) {
      if (err) return handleError(err);
    });
    res.redirect("/user");
  } catch (err) {
    console.log(err);
  }
};
