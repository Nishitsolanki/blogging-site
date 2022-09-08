const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const loginController = require("../controllers/loginController")
const mware = require("../middleware/auth")


router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

//creating Authors API
router.post("/authors", authorController.authors);

//creating Blogs API
router.post("/blogs", blogController.blogs);

// Fetching blogsByFilter
//router.get("/blogs", mware.authenticate , mware.authorise , blogController.getblogs);

//Updating Blogs
router.put("/blogs/:blogId",   mware.authenticate , mware.authorise , blogController.blogsUpdate);

// Deleted by blogId
router.delete("/blogsby/:blogId", mware.authenticate , mware.authorise ,  blogController.deleteBlogById);

// Delete by blog queryparams
router.delete("/blogs",  mware.authenticate , mware.authorise , blogController.deleteblog);

// login author
router.post("/login",loginController.login)

module.exports = router;