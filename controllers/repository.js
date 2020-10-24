const Repository = require('../models/Repo');
const User = require('../models/User');
const { fileExistence } = require('../utility/fileExistence');

exports.getRepo = async (req, res) => {
  try {
    let repository = await Repository.find({}).populate('User', 'User').exec();
    await res.send(repository);
  } catch (err) {
    console.error(err);
  }
};

exports.createRepo = async (req, res) => {
  const repoExist = await Repository.findOne({
    Name: req.body.Name,
  });
  if (repoExist) return res.status(400).send('Repo already Exist');
  try {
    const newRepo = await new Repository({
      Name: req.body.Name,
      Contributors: req.body.Contributors,
      numStars: req.body.numStars,
    });

    await newRepo.save(function (err) {
      if (err) return handleError(err);
    });
    res.redirect('/repos');
  } catch (err) {
    console.log(err);
  }
};

exports.getRepoById = async (req, res) => {
  const foundRepo = await Repository.findById(req.params._id);
  res.send(foundRepo);
};

exports.updateRepo = async (req, res) => {
  try {
    const updatedUser = await Repository.update(
      {
        _id: req.params.id,
      },
      {
        $set: {
          Name: req.body.Name,
          numStars: 5,
        },
      }
    );
    await res.send(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteRepo = async (req, res) => {
  try {
    await Repository.findByIdAndRemove(req.params.id);
    res.send('deleted');
  } catch (err) {
    console.error(err);
  }
};

exports.uploadFiles = async (req, res) => {
  try {
    if (!req.file) return res.send('No file uploaded');

    // check if file already exists
    fileExistence(req);

    res.json({ data: 'file uploaded successfully' });
  } catch (err) {
    res.json({ err });
  }
};
