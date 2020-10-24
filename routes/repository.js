const express = require('express');
const upload = require('../config/multer');
const dirCreation = require('../middleware/dirCreation');

const router = express.Router();
const verify = require('../middleware/verify');
const {
  getRepo,
  createRepo,
  updateRepo,
  deleteRepo,
  getRepoById,
  uploadFiles,
} = require('../controllers/repository');

router.get('/repos', getRepo);
router.post('/repos/new', verify, createRepo);
router.put('/repos/update/:id', verify, updateRepo);
router.delete('/repos/delete/:id', verify, deleteRepo);
router.get('/repos/:id', getRepoById);

// upload files
router.post(
  '/:username/:repo/uploadfile/',
  dirCreation,
  verify,
  upload.single('repo_file'),
  uploadFiles
);

module.exports = router;
