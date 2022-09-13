const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

//Authentication Part
exports.authentication = function (req, res, next) {
  try {
    let Token = req.headers["x-api-key"];
    if (!Token)
      return res.status(400).send({ status: false, msg: "login is requred" });

    let tokenVerify = jwt.verify(Token, "FunctionUP-Project1-Group30");
    return next()
  } catch (err) {
    return res.status(500).send({ status: false, msg: "Server Error 500" });
  }
};

exports.authorization = async function (req, res, next) {
  try {
    let Token = req.headers["x-api-key"];
    if (!Token)
      return res.status(400).send({ status: false, msg: "login is requred" });

    let tokenVerify = jwt.verify(Token, "FunctionUP-Project1-Group30");
    req.headers.authorId = tokenVerify.authorId;

    let checkBlogId = await blogModel.findOne({ _id: req.params.blogId });
    if (!checkBlogId) {
      return res.status(403).send({ status: false, msg: "blogid is wrong" });
    }
    if (tokenVerify.userId != checkBlogId.authorId) {
      return res.status(403).send({ status: false, msg: "not authorised" });
    }

    return next()
  } catch (err) {
    return res.status(500).send({ status: false, msg: "Server Error 500" });
  }
};