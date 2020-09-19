const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getUser, createUser } = require("../controllers/user");
const verify = require("../middleware/verify");

router.get("/user", getUser);
router.post("/user/new", verify, createUser);

module.exports = router;
