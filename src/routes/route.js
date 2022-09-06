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
router.put("/blogs/:blogId", blogController.blogsUpdate);
// deleted by blogId

router.delete('/blogs/:blogId', blogController.deleteBlogById)
// delete by blog queryparams
router.delete('/blogs' , blogController.deleteblog)

module.exports = router;
