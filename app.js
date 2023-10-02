const express = require("express");
const { blogs } = require("./model/index");
const cookieParser = require("cookie-parser");
require("dotenv").config(); //requiring dotenv

// const {
//   renderCreateBlog,
//   createBlog,
//   allBlog,
//   singleBlog,
//   deleteBlog,
//   renderEditBlog,
//   editBlog,
// } = require("./controller/blog/blogController");
const { route } = require("./routes/blogRoutes");
const app = express();

// importing routes
const blogRoute = require("./routes/blogRoutes");
const authRoute = require("./routes/authRoute");

//datebase connection
require("./model/index");

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

app.use((req, res, next) => {
  res.locals.currentUser = req.cookies.token;
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
