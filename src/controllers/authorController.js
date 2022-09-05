const authorModel = require("../models/authorModel")

const authors = async function (req, res) {
    let data= req.body
    let savedData= await authorModel.create(data)
    res.send({msg: savedData})
}

  module.exports.authors = authors