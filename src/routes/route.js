const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

router.post("/authors", authorController.authors);

//blogs
router.post("/blogs", blogController.blogs);
router.get("/blogs", blogController.getblogs);
module.exports = router;
