const jwt = require("jsonwebtoken");

//Checking Value in (Present/Not)
exports.headerCheck = function (req, res, next) {
  let headerData = req.headers["x-api-key"];
  if (headerData === undefined) {
    return res.send({ msg: "Header Is Madtory" });
  } else {
    next();
  }
};

//Authentication Part
exports.authentication = function (req, res, next) {
  let Token = req.headers["x-api-key"];
  let tokenVerify = jwt.verify(Token, "FunctionUP-Project1-Group30");

  if (tokenVerify.UserId !== req.query.authorId) {
    return res.status(404).send({ msg: "User is Imposter" });
  } else {
    next();
  }
};
