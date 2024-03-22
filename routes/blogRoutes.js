const {
  allBlog,
  renderCreateBlog,
  createBlog,
  singleBlog,
  editBlog,
  renderEditBlog,
  deleteBlog,
  renderMyBlogs,
  renderSecret,
} = require("../controller/blog/blogController");
const { currentUser } = require("../middleware/currentUser");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = require("express").Router();
const { multer, storage } = require("../middleware/multerConfig");
const { restrictTo } = require("../middleware/restrictTo");
const catchError = require("../services/catchError");
const sanitizer = require("../services/sanitizer");
const upload = multer({ storage: storage });

router.route("/").get(allBlog);
router
  .route("/createBlog")
  .get(catchError(isAuthenticated), catchError(renderCreateBlog))
  .post(isAuthenticated, upload.single("image"), sanitizer, createBlog);
router.route("/single/:id").get(currentUser, singleBlog);
router.route("/delete/:id").get(isAuthenticated, deleteBlog);
router
  .route("/editBlog/:id")
  .post(isAuthenticated, upload.single("image"), sanitizer, editBlog);
router
  .route("/edit/:id")
  .get(isAuthenticated, restrictTo("user"), renderEditBlog);
router
  .route("/myblogs")
  .get(isAuthenticated, restrictTo("user"), renderMyBlogs);

router.route("/secret").get(isAuthenticated, restrictTo("admin"), renderSecret);
// you can do this as well (restAPI)
// router.route("/:id").get(singleBlog).post(editBlog).delete(deleteBlog);

module.exports = router;
