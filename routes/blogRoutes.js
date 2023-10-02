const {
  allBlog,
  renderCreateBlog,
  createBlog,
  singleBlog,
  editBlog,
  renderEditBlog,
  deleteBlog,
  myBlogs,
  renderMyBlogs,
} = require("../controller/blog/blogController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = require("express").Router();
const { multer, storage } = require("../middleware/multerConfig");
const upload = multer({ storage: storage });

router.route("/").get(allBlog);
router
  .route("/createBlog")
  .get(isAuthenticated, renderCreateBlog)
  .post(isAuthenticated, upload.single("image"), createBlog);
router.route("/single/:id").get(isAuthenticated, singleBlog);
router.route("/delete/:id").get(isAuthenticated, deleteBlog);
router.route("/editBlog/:id").post(isAuthenticated, editBlog);
router.route("/edit/:id").get(isAuthenticated, renderEditBlog);
router.route("/myblogs").get(isAuthenticated, renderMyBlogs);

// you can do this as well (restAPI)
// router.route("/:id").get(singleBlog).post(editBlog).delete(deleteBlog);

module.exports = router;
