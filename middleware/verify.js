const jwt = require('jsonwebtoken');

module.exports = async function verifytoken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const verifiedToken = await jwt.verify(token, 'Secret');
    req.user = verifiedToken;
    next();
  } catch (err) {
    console.log(err);
  }
};
