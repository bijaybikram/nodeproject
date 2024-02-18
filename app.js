const express = require("express");
const { blogs } = require("./model/index");
const cookieParser = require("cookie-parser");
require("dotenv").config(); //requiring dotenv
const app = express();
const sanitizeHtml = require("sanitize-html");
const rateLimit = require("express-rate-limit");

// require express-session & connect-flash
const session = require("express-session");
const flash = require("connect-flash");

// const {
//   renderCreateBlog,
//   createBlog,
//   allBlog,
//   singleBlog,
//   deleteBlog,
//   renderEditBlog,
//   editBlog,
// } = require("./controller/blog/blogController");
// const { route } = require("./routes/blogRoutes");

// const dirty = "<strong>hello world</strong>";
// const clean = sanitizeHtml(dirty);
// console.log(clean);

// importing routes
const blogRoute = require("./routes/blogRoutes");
const authRoute = require("./routes/authRoute");
const { decodeToken } = require("./services/decodeToken");

//datebase connection
require("./model/index");

// to limit the rate of request sent to the server
const rateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  limit: 3,
  message:
    "You have exceeded the request limit, Please try again after 2 minutes",
});

app.use("/forgotPassword", rateLimiter);

// to flash alerts and messages
app.use(
  session({
    secret: "helloworld",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

//cookie data lai parse garauna
app.use(cookieParser());

// telling the nodejs to set view-engine to ejs
app.set("view engine", "ejs");

//node js lai file access garna dey vaneko
app.use(express.static("public"));
app.use(express.static("uploads/"));

// form bata data aairaxa parse gara or handle gar vaneko ho
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  res.locals.currentUser = req.cookies.token;
  const token = req.cookies.token;
  if (token) {
    const decryptedResult = await decodeToken(token, process.env.SECRETKEY);
    if (decryptedResult && decryptedResult.id) {
      res.locals.currentUserId = decryptedResult.id;
    }
  }
  next();
});

// defining route
app.use("", blogRoute);
app.use("", authRoute);

// allBlog
// app.get("/", allBlog);

// createblog
// app.get("/createblog", renderCreateBlog);

// app.post("/createblog", createBlog);

// single blog page
// app.get("/single/:id", singleBlog);

// Edit blog
// app.get("/edit/:id", renderEditBlog);

// app.post("/editBlog/:id", editBlog);

// delete blog page
// app.get("/delete/:id", deleteBlog);

app.listen(3000, function () {
  console.log("NodeJS project has started at port 3000");
});
