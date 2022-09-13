const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const logInController = require("../controllers/logInController");
//middleware
const middleware = require("../middleware/auth");



router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

//creating Authors API
router.post("/authors", authorController.authors);

//creating Blogs API
router.post("/blogs", middleware.authentication, blogController.blogs);

// Fetching blogsByFilter
router.get("/blogs", middleware.authentication, blogController.getblogs);

//Updating Blogs
router.put("/blogs/:blogId", middleware.authentication, middleware.authorization, blogController.blogsUpdate);

// Deleted by blogId
router.delete("/blogsby/:blogId", middleware.authentication, middleware.authorization, blogController.deleteBlogById);

// Delete by blog queryparams
router.delete("/blogs", middleware.authentication, blogController.deleteblog);

//login UserByEmailAndPassword
router.post("/login", logInController.login);

module.exports = router;