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
  .get(
    catchError(isAuthenticated),
    catchError(restrictTo("user")),
    catchError(renderCreateBlog)
  )
  .post(
    catchError(isAuthenticated),
    upload.single("image"),
    sanitizer,
    catchError(createBlog)
  );
router
  .route("/single/:id")
  .get(
    catchError(currentUser),
    catchError(restrictTo("user")),
    catchError(singleBlog)
  );
router
  .route("/delete/:id")
  .get(
    catchError(isAuthenticated),
    catchError(restrictTo("user")),
    catchError(deleteBlog)
  );
router
  .route("/editBlog/:id")
  .post(
    catchError(isAuthenticated),
    upload.single("image"),
    sanitizer,
    catchError(editBlog)
  );
router
  .route("/edit/:id")
  .get(
    catchError(isAuthenticated),
    catchError(restrictTo("user")),
    catchError(renderEditBlog)
  );
router
  .route("/myblogs")
  .get(
    catchError(isAuthenticated),
    catchError(restrictTo("user")),
    catchError(renderMyBlogs)
  );

router
  .route("/secret")
  .get(
    catchError(isAuthenticated),
    catchError(restrictTo("admin")),
    catchError(renderSecret)
  );
// you can do this as well (restAPI)
// router.route("/:id").get(singleBlog).post(editBlog).delete(deleteBlog);

module.exports = router;
