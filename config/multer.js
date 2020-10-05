const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const filePath = path.join(__dirname, 'uploads', req.params.username, req.params)
    cb(null, `uploads/${req.params.username}/${req.params.repo}/`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

module.exports = upload;
