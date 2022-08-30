
const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
  try {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    //If no token is present in the request header return error
    if (!token) return res.status(401).send({ status: false, msg: "token must be present" });
    console.log(token);

    let decodedToken = jwt.verify(token, "functionup-thorium");
    if (!decodedToken) {
      return res.status(401).send({ status: false, msg: "token is invalid" })
    }
    else {

      next()
    }
  }
  catch (err) {
    console.log(err.message)
    res.status(500).send({ msg: "Error", error: err.message })

  }
}

const authorise = function (req, res, next) {
  try {
    // comapre the logged in user's id and the id in request
    let token = req.headers["x-auth-token"]
    let decodedToken = jwt.verify(token, "functionup-thorium")

    let userToBeModified = req.params.userId
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if (userToBeModified != userLoggedIn) return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
    next()
  }


  catch (err) {
    console.log(err.massage)
    res.status(500).send({ msg: "Error", error: err.message })
  }
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise