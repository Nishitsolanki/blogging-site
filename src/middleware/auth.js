const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

const authenticate = function (req, res, next) {

  token = req.headers["x-api-key"];
  //If no token is present in the request header return error
  if (!token) return res.status(401).send({ status: false, msg: "token must be present" });

  let decodedToken = jwt.verify(token, "functionup-plutonium-group30");
  if (!decodedToken) {
    return res.status(401).send({ status: false, msg: "token is invalid" })
  }
  else {

    next()
  }
}

const authorise = async function (req, res, next) {
  // comapre the logged in user's id and the id in request
  let token = req.headers["x-api-key"]
  let data = req.params.blogId

  let decodedToken = jwt.verify(token, "functionup-plutonium-group30")

  let authorToBeModified = req.query.authorId
  //userId for the logged-in user
  let authorLoggedIn = decodedToken.authorId
  if (data == ':blogId') {
    return res.status(400).send({ msg: "blog id is require" })
  }
  try {
    if (data) {
      {
        let newdata = await blogModel.find(authorLoggedIn.authorId)
        let newsdata = await blogModel.find({ _id: data }) // must be object form
        if (!newdata && !newsdata) {
          return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
        } else {
          if (authorToBeModified != authorLoggedIn) return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
          return next()
        }
      }
    }

    if (authorToBeModified != authorLoggedIn) return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
    return next()
  }
  catch (err) {
    res.status(500).send({ ErrorName: err.name, ErrorMsg: err.message });
  }
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise