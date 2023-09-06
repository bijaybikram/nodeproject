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
app.get("/", (req, res) => {
  res.render("blogs");
});

// createblog
app.get("/createblog", (req, res) => {
  res.render("createBlog");
});

app.post("/createblog", async (req, res) => {
  const { title, subtitle, description } = req.body;
  // console.log(title, subtitle, description);

  await blogs.create({
    title: title,
    subTitle: subtitle,
    description: description,
  });

  res.send("form submitted succesfully!");
});

app.listen(3000, function () {
  console.log("NodeJS project has started at port 3000");
});
