const { users } = require("../../model");
const bcrypt = require("bcrypt");

exports.renderRegisterForm = (req, res) => {
  res.render("register");
};

exports.registerUser = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  //conditions if passwords donot match
  if (password !== confirmPassword) {
    res.send("Passwords donot match!");
  } else {
    // INSERT into the USER table
    await users.create({
      email,
      username,
      password: bcrypt.hashSync(password, 8),
    });
  }

  res.redirect("/login");
};

exports.renderLoginForm = (req, res) => {
  res.render("login");
};

exports.loginUser = (req, res) => {
  console.log(req.body);
};
