const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel");


const login = async function(req, res){


    let email = req.body.emailId;
    let password = req.body.password;
  
    let author = await authorModel.findOne({ emailId: email, password: password });
    if (!author)
      return res.send({status: false, msg: "email or password is not corerct" });
  
    
    let token = jwt.sign(
      {
        authorId: author._id.toString(),
        batch: "plutonium",
        organisation: "FUnctionUp",
      },
      "functionup-plutonium-group30"
    );
    res.setHeader("x-auth-token", token);
    res.send({ status: true, data: token });
  };
  
  module.exports.login = login