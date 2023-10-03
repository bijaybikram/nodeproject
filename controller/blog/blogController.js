const { blogs, users } = require("../../model");
const fs = require("fs"); // fs - file system

exports.renderCreateBlog = (req, res) => {
  res.render("createBlog");
};

exports.createBlog = async (req, res) => {
  // console.log(req.user[0].id, "id of the user");
  const userId = req.user[0].id;

  // console.log(req.file);
  // first approach
  // const title = req.body.title
  // const description  = req.body.description
  // const subTitle = req.body.subtitle

  //second approach
  const { title, subtitle, description } = req.body;
  const fileName = req.file.filename;
  if (!title || !description || !subtitle || !req.file) {
    return res.send("Please provide title,description,subTitle,file");
  }
  // console.log(title, subtitle, description);

  await blogs.create({
    title: title,
    subTitle: subtitle,
    description: description,
    userId: userId,
    image: process.env.PROJECT_URL + fileName,
  });

  res.redirect("/");
  // res.send("form submitted succesfully!");
};

exports.allBlog = async (req, res) => {
  //table bata data nikalna paryo
  const allBlogs = await blogs.findAll({
    include: {
      model: users,
    },
  });
  // console.log(allBlogs);
  res.render("blogs", { everyBlogs: allBlogs });
};

exports.singleBlog = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;
  //id ko data magna paryo
  const blog = await blogs.findAll({
    where: { id: id },
    include: {
      model: users,
    },
  });

  const user = await users.findAll({
    where: { id: userId },
  });
  // console.log(blog);
  res.render("singleBlog", { blog: blog, user: user });
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
  // const fileName = req.file.filename;
  const oldDatas = await blogs.findAll({
    where: { id: id },
  });
  let fileUrl;
  if (req.file) {
    fileUrl = process.env.PROJECT_URL + req.file.filename;
    const oldImagePath = oldDatas[0].image; //getting the the image path from the previous data
    const oldImageName = oldImagePath.slice(22); // slicing the path to extract only the file name
    // console.log("This is the old image path" + oldImagePath);
    fs.unlink(`uploads/${oldImageName}`, (err) => {
      if (err) {
        console.log("error happened", err);
      } else {
        console.log("deleted succesfully");
      }
    });
  } else {
    fileUrl = oldDatas[0].image; // old fileUrl
  }

  await blogs.update(
    {
      title: title,
      subTitle: subTitle,
      description: description,
      image: fileUrl,
    },
    { where: { id: id } }
  );

  // const oldImagePath = oldDatas[0].image; //getting the the image path from the previous data
  // const oldImageName = oldImagePath.slice(22); // slicing the path to extract only the file name
  // // console.log("This is the old image path" + oldImagePath);
  // if (fileUrl !== oldImagePath) {
  //   fs.unlink(`uploads/${oldImageName}`, (err) => {
  //     if (err) {
  //       console.log("error happened", err);
  //     } else {
  //       console.log("deleted succesfully");
  //     }
  //   });
  // }

  res.redirect("/single/" + id);
};

exports.deleteBlog = async (req, res) => {
  const id = req.params.id;
  const oldDatas = await blogs.findAll({
    where: { id: id },
  });
  //delete gardey yo blog vanna lai
  await blogs.destroy({ where: { id: id } });

  // getting the deleted blog image path and extracting the name from it
  const oldImagePath = oldDatas[0].image;
  const oldImageName = oldImagePath.slice(22);

  // to delete the file from filesystem and database altogether
  fs.unlink(`uploads/${oldImageName}`, (err) => {
    if (err) {
      console.log("error happened", err);
    } else {
      console.log("deleted succesfully");
    }
  });

  res.redirect("/");
};

exports.renderMyBlogs = async (req, res) => {
  const userId = req.userId;

  const myBlogs = await blogs.findAll({ where: { userId: userId } });

  res.render("myBlogs", { myBlogs: myBlogs });
};
