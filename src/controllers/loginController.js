const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel");

exports.login = async function (req, res) {
  try {
    let checkEmailAndPassword = await authorModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    //Validating Email And PassWord(present/Not)
    if (!checkEmailAndPassword) {
      return res.status(400).send({ msg: "Email and Password Are invalid" });

      //creating Token
    } else {
      let payloadDetails = {
        authorId: checkEmailAndPassword._id.toString(),
        password: checkEmailAndPassword.password,
        batch: "Plutonium",
        Project: "Blogging - Site",
        group: 30,
      };
      let Token = jwt.sign(payloadDetails, "FunctionUP-Project1-Group30");
      res.header({ "x-api-key": Token });

      return res
        .status(201)
        .send({ data: Token, authorId: checkEmailAndPassword._id });
    }
  } catch (err) {
    res.status(500).send({ msg: "Server error HTTP 500" });
  }
};