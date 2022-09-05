const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");

//Create a blog document from request body. Get authorId in request body only
exports.blogs = async function (req, res) {
  try {
    let blogBody = req.body;
    let checkAuthorId = await authorModel.findById(req.body.authorId);
    if (!checkAuthorId) {
      return res.status(400).send({ msg: "Please Enter Valid AuthorId" });
    } else {
      let blogData = await blogModel.create(blogBody);
      res.status(201).send({ data: blogData });
    }
  } catch (err) {
    res.status(500).send({ ErrorName: err.name, ErrorMsg: err.message });
  }
};
