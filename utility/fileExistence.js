const fs = require('fs');
const path = require('path');

exports.fileExistence = ({ file, params }) => {
  const { username, repo } = params;
  console.log(username, repo); // test

  const userDirPath = path.join(__dirname, '..', 'uploads', username);
  const repoDirPath = path.join(userDirPath, repo);
  const filePath = path.join(repoDirPath, file.originalname);
  const metaDataPath = path.join(userDirPath, 'metaData.txt');

  // file exists
  if (fs.existsSync(filePath)) {
    // update meta data -> file <file_name> updated
    const today = new Date();
    const curr =
      today.getDate() +
      '/' +
      (today.getMonth() + 1) +
      '/' +
      today.getFullYear() +
      ', ' +
      today.toLocaleTimeString();
    const message = `
      file updated : ${file.originalname}
      time: ${curr}
      \n\n
    `;
    fs.appendFileSync(metaDataPath, message);
  }

  // file does not exist
  else {
    // cant implement this -> multer middleware functionality abt req.file
    // update meta data -> new file <file_name> added
  }

  const data = fs.readFileSync(metaDataPath, 'utf8');
  console.log('Data: \n' + data);
};
