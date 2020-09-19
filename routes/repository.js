const express = require('express');

const router = express.Router();
const verify = require('../middleware/verify');
const {
  getRepo,
  createRepo,
  updateRepo,
  deleteRepo,
  getRepoById,
} = require('../controllers/repository');

router.get('/repos', getRepo);
router.post('/repos/new', verify, createRepo);
router.put('/repos/update/:id', verify, updateRepo);
router.delete('/repos/delete/:id', verify, deleteRepo);
router.get('/repos/:id', getRepoById);

module.exports = router;
