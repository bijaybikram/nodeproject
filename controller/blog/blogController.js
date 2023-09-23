const { blogs } = require("../../model");

exports.renderCreateBlog = (req, res) => {
  res.render("createBlog");
};

exports.createBlog = async (req, res) => {
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
};

exports.allBlog = async (req, res) => {
  //table bata data nikalna paryo
  const allBlogs = await blogs.findAll();
  // console.log(allBlogs);
  res.render("blogs", { everyBlogs: allBlogs });
};

exports.singleBlog = async (req, res) => {
  const id = req.params.id;

  //id ko data magna paryo
  const blog = await blogs.findAll({ where: { id: id } });
  // console.log(blog);

  res.render("singleBlog", { blog: blog });
};

exports.renderEditBlog = async (req, res) => {
  const id = req.params.id;
  console.log(req.body);

  // find blog of that id
  const blog = await blogs.findAll({ where: { id: id } });
  //supply blog data to ejs
  res.render("editBlog", { blog: blog });
};

exports.editBlog = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const subTitle = req.body.subtitle;
  const description = req.body.description;

  await blogs.update(
    {
      title: title,
      subTitle: subTitle,
      description: description,
    },
    { where: { id: id } }
  );

  res.redirect("/single/" + id);
};

exports.deleteBlog = async (req, res) => {
  const id = req.params.id;

  //delete gardey yo blog vanna lai
  await blogs.destroy({ where: { id: id } });
  res.redirect("/");
};