const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
// !!!!-------CREATE USER--------!!!!!!
const createUser = async function (req, res) {
  try {
    let data = req.body;
    console.log(data)
    if (Object.keys(data).length != 0) {
      let savedData = await userModel.create(data);
      console.log(req.newAtribute);
      res.status(201).send({ msg: savedData });
    }
    else res.status(400).send({ msg: "BAD REQUEST" })
  }
  catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
};
// !!!!!!!!!------ LOGIN USER -------!!!!!!
const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
      return res.status(401).send({status: false,msg: "username or the password is not corerct"});
      let token = jwt.sign(
        {
          userId: user._id.toString(),
          batch: "thorium",
          organisation: "FUnctionUp",
        },
        "functionup-thorium"
      );
      res.setHeader("x-auth-token", token);
      res.status(200).send({ status: true, data: token }); 

  }
  catch (err) {
    console.log(err.massage)
    res.status(500).send({ msg: "Error", error: err.message })

  }
};
// !!!!!!!!------GET USER DATA ------!!!!!!!
const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.status(400).send({ status: false, msg: "No such user exists" });

    res.status(200).send({ status: true, data: userDetails });
  }
  catch (err) {
    console.log(err.massage)
    res.status(500).send({ msg: "Error", error: err.message })

  }
};
// !!!!!!!!------UPDATE USER ------!!!!!!!
const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.status(403).send("No such user exists");
    }
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
    res.status(200).send({ status: true, data: updatedUser });
  }
  catch (err) {
    console.log(err.massage)
    res.status(500).send({ msg: "Error", error: err.message })

  }
};

// // !!!!!!!!------DELETE USER ------!!!!!!!
const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId
    let user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).send({ status: false, message: "no such user exists" })
    }
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { isDeleted: true }, { new: true })
    res.status(200).send({ status: true, data: updatedUser })
  }
  catch (err) {
    console.log(err.massage)
    res.status(500).send({ msg: "Error", error: err.message })


  }
}



module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser

