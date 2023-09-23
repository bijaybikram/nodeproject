const {
  allBlog,
  renderCreateBlog,
  createBlog,
  singleBlog,
  editBlog,
  renderEditBlog,
  deleteBlog,
} = require("../controller/blog/blogController");

const router = require("express").Router();

router.route("/").get(allBlog);
router.route("/createBlog").get(renderCreateBlog).post(createBlog);
router.route("/single/:id").get(singleBlog);
router.route("/delete/:id").get(deleteBlog);
router.route("/editBlog/:id").post(editBlog);
router.route("/edit/:id").get(renderEditBlog);

// you can do this as well (restAPI)
// router.route("/:id").get(singleBlog).post(editBlog).delete(deleteBlog);

module.exports = router;
