const path = require('path');
const fs = require('fs');

module.exports = function dirCreation(req, res, next) {
  const { username, repo } = req.params;

  console.log(username, repo);

  const uploadDirPath = path.join(__dirname, '..', 'uploads');
  const userDirPath = path.join(__dirname, '..', 'uploads', username);
  const repoDirPath = path.join(__dirname, '..', 'uploads', username, repo);
  const metaDataPath = path.join(userDirPath, 'metaData.txt');

  // making upload dir
  if (!fs.existsSync(uploadDirPath)) {
    fs.mkdirSync(uploadDirPath);
  }

  // making user and repo dir
  if (!fs.existsSync(userDirPath)) {
    fs.mkdirSync(userDirPath);
    fs.mkdirSync(repoDirPath);
  } else if (!fs.existsSync(userDirPath)) fs.mkdirSync(repoDirPath);

  // check metadata existence
  if (!fs.existsSync(metaDataPath)) {
    fs.createWriteStream(metaDataPath).end();
    fs.writeFileSync(metaDataPath, '[] \n test \n\n');
  }

  next();
};
