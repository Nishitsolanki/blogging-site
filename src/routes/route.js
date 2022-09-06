const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

//creating Authors API
router.post("/authors", authorController.authors);

//creating Blogs API
router.post("/blogs", blogController.blogs);

// Fetching blogsByFilter
router.get("/blogs", blogController.getblogs);

//Updating Blogs
router.put("/blogs/:blogId", blogController.blogsUpdate);

// Deleted by blogId
router.delete("/blogsby/:blogId", blogController.deleteBlogById);

// Delete by blog queryparams
router.delete("/blogs", blogController.deleteblog);

module.exports = router;
