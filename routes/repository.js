const express = require("express");

const router = express.Router();

const {
  getRepo,
  createRepo,
  updateRepo,
  deleteRepo,
  getRepoById,
} = require("../controllers/repository");

router.get("/repos", getRepo);
router.post("/repos/new", createRepo);
router.put("/repos/update/:id", updateRepo);
router.delete("/repos/delete/:id", deleteRepo);
router.get("/repos/:id", getRepoById);

module.exports = router;
