const express = require("express");
const { blogs } = require("./model/index");
const app = express();

//datebase connection
require("./model/index");

// telling the nodejs to set view-engine to ejs
app.set("view engine", "ejs");

// form bata data aairaxa parse gara or handle gar vaneko ho
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allBlog
app.get("/", async (req, res) => {
  //table bata data nikalna paryo
  const allBlogs = await blogs.findAll();
  // console.log(allBlogs);
  res.render("blogs", { everyBlogs: allBlogs });
});

// createblog
app.get("/createblog", (req, res) => {
  res.render("createBlog");
});

// single blog page
app.get("/single/:id", async (req, res) => {
  const id = req.params.id;

  //id ko data magna paryo
  const blog = await blogs.findAll({ where: { id: id } });
  // console.log(blog);

  res.render("singleBlog", { blog: blog });
});

// delete blog page
app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  //delete gardey yo blog vanna lai
  await blogs.destroy({ where: { id: id } });
  res.redirect("/");
});

app.post("/createblog", async (req, res) => {
  // first approach
  // const title = req.body.title
  // const description  = req.body.description
  // const subTitle = req.body.subtitle

  //second approach
  const { title, subtitle, description } = req.body;
  // console.log(title, subtitle, description);

  await blogs.create({
    title: title,
    subTitle: subtitle,
    description: description,
  });

  res.redirect("/");
  // res.send("form submitted succesfully!");
});

app.listen(3000, function () {
  console.log("NodeJS project has started at port 3000");
});
