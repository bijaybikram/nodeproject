const { users } = require("../../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// login starts from here
exports.renderLoginForm = (req, res) => {
  res.render("login");
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send("enter both the email and password");
  }

  const associatedDataWithEmail = await users.findAll({
    where: {
      email,
    },
  });
  if (associatedDataWithEmail.length == 0) {
    res.send("User with this email doesn't exist!");
  } else {
    const associatedPassword = associatedDataWithEmail[0].password;
    const isMatch = bcrypt.compareSync(password, associatedPassword);
    if (isMatch) {
      // generate web token here

      const token = jwt.sign(
        { id: associatedDataWithEmail[0].id },
        process.env.SECRETKEY,
        {
          expiresIn: "30d",
        }
      );
      res.cookie("token", token, { secure: true, expiresIn: "120" }); // browser ma application vanni tab vitra cookies ma save hunxa

      // console.log(process.env.SECRETKEY);
      res.send("login success!");
    } else {
      res.send("login failed!");
    }

    // check if password matches or not
  }
};
