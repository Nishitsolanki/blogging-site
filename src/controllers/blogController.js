const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");

const isValid = function (value) {
    if (typeof value === "undefined" || value === Number || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

//Create a blog document from request body. Get authorId in request body only
exports.blogs = async function (req, res) {
    try {
        let blogBody = req.body;
        if (Object.keys(blogBody).length == 0) {
            return res.status(400).send({ status: false, msg: "data is required" });
        }
        if (!isValid(blogBody.title)) {
            return res.status(400).send({ status: false, msg: "title is required" });
        }

        if (!isValid(blogBody.body)) {
            return res.status(400).send({ status: false, msg: "body is required" });
        }

        if (!isValid(blogBody.authorId)) {
            return res.status(400).send({ status: false, msg: "authorId is required" });
        }

        if (!isValid(blogBody.tags)) {
            return res.status(400).send({ status: false, msg: "tags is required" });
        }

        if (!isValid(blogBody.category)) {
            return res.status(400).send({ status: false, msg: "category is required" });
        }

        if (!isValid(blogBody.subcategory)) {
            return res.status(400).send({ status: false, msg: "subcategory is required" });
        }

        if (!isValid(blogBody.publishedAt)) {
            return res.status(400).send({ status: false, msg: "publishedAt is required" });
        }

        if (!isValid(blogBody.deletedAt)) {
            return res.status(400).send({ status: false, msg: "deletedAt is required" });
        }

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

const getblogs= async function(req,res){
    try{
        //let data=req.Query.Params
        //let catogory=data.category
        let getData = await blogModel.find({category:{$in:"productivity"}},{});
        res.status(201).send({ data: getData });

    }catch(err){
        res.status(500).send({ ErrorName: err.name, ErrorMsg: err.message });
    }
};
module.exports.getblogs = getblogs;