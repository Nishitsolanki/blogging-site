const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel");



const login = async function (req, res) {
  try {

    let email = req.body.emailId;
    let password = req.body.password;


    let author = await authorModel.findOne({ emailId: email, password: password });
    if (!author)
      return res.status(400).send({ status: false, msg: "email or password is not corerct" });


    let token = jwt.sign(
      {
        authorId: author._id.toString(),
        batch: "plutonium",
        organisation: "FUnctionUp",
      },
      "functionup-plutonium-group30"
    );
    res.setHeader("x-api-key", token);
    res.status(201).send({ status: true, data: token, authorId: author._id });
  }
  catch (err) {
    return res.status(500).send({ ErrorName: err.name, ErrorMessage: err.message });
  }
}
module.exports.login = login