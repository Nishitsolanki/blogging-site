const authorModel = require("../models/authorModel");

const authors = async function (req, res) {
  try {
    let data = req.body;
    let savedData = await authorModel.create(data);
    res.status(201).send({ msg: savedData });
  } catch (err) {
    res.status(500).send({ ErrorName: err.name, ErrorMessage: err.message });
  }
};

module.exports.authors = authors;
