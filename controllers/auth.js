const { loginValidation } = require('../validation/valid');

const jwt = require('jsonwebtoken');

const User = require('../models/User');
exports.login = async (req, res) => {
  try {
    const { error } = await loginValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({ Email: req.body.Email });
    if (!user) return res.status(400).send('Email already Exist');
    //AUTH
    const token = await jwt.sign({ _id: user._id }, 'Secret', {
      expiresIn: '1h',
    });
    res.header('auth-token', token).send(token);
  } catch (err) {
    console.log(err);
  }
};
