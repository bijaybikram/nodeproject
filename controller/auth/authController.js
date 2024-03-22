const { users } = require("../../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../services/sendEmail");

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
  const error = req.flash("error");
  res.render("login", { error });
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
        `${process.env.SECRETKEY}`,
        {
          expiresIn: "30d",
        }
      );
      res.cookie("token", token); // browser ma application vanni tab vitra cookies ma save hunxa [cookie vitra rakhna milxa expiry set garna { secure: true, expiresIn: "120" }]

      // console.log(process.env.SECRETKEY);
      // res.send("login success!");
      req.flash("success", "login successful!");
      res.redirect("/");
    } else {
      req.flash("error", "Invalid Password");
      res.redirect("/login");
      // res.send("login failed, Invalid Password!");
    }
    // res.redirect("/");

    // check if password matches or not
  }
};

exports.logOut = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

exports.renderForgotPassword = (req, res) => {
  res.render("forgotPassword");
};

exports.checkForgotPassword = async (req, res) => {
  // const arrayOfEmails = [""];
  const email = req.body.email;

  if (!email) {
    res.send("please Provide email");
  }

  const emailExist = await users.findAll({
    where: {
      email: email,
    },
  });

  if (emailExist.length == 0) {
    res.send("user with that email does not exist!");
  } else {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000);
    await sendEmail({
      email: email,
      subject: "OTP for forgot password",
      otp: generatedOtp,
    });
    emailExist[0].otp = generatedOtp;
    emailExist[0].otpGeneratedTime = Date.now();
    await emailExist[0].save();

    res.redirect("/otp?email=" + email);
  }
};

exports.renderOtpForm = (req, res) => {
  const email = req.query.email;
  // console.log(email);
  res.render("otpForm", { email: email });
};

exports.handleOTP = async (req, res) => {
  const otp = req.body.otp;
  const email = req.params.id;
  if (!otp || !email) {
    return res.send("please send email, otp");
  }
  const userData = await users.findAll({
    where: {
      email: email,
      otp: otp,
    },
  });
  if (userData.length == 0) {
    res.send("Invaid OTP");
  } else {
    const currentTIme = Date.now(); //current time
    const otpGeneratedTime = userData[0].otpGeneratedTime; // OTP generated time
    if (currentTIme - otpGeneratedTime <= 120000) {
      // userData[0].otp = null;
      // userData[0].otpGeneratedTime = null;
      // await userData[0].save();
      res.redirect(`/changePassword?email=${email}&otp=${otp}`);
    } else {
      res.send("OTP Timed OUt");
      // res.redirect("/forgotPassword");
    }
  }
};

exports.renderChangePasswordForm = (req, res) => {
  const email = req.query.email;
  const otp = req.query.otp;

  if (!email || !otp) {
    console.log("this is:", email, otp);
    return res.send("Email and otp should be provided in the query");
  }
  res.render("changePasswordForm", { email, otp });
};

exports.handleChangePassword = async (req, res) => {
  const email = req.params.email;
  const otp = req.params.otp;
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;

  if (!newPassword || !confirmNewPassword || !email || !otp) {
    res.send("Please provide new password, confirm new password");
  }

  // check if that email and OTP exist or not
  const userData = await users.findAll({
    where: {
      email: email,
      otp: otp,
    },
  });
  if (newPassword !== confirmNewPassword) {
    res.send("Passwords from both fields donot match!");
    return;
  }

  if (userData.length == 0) {
    res.send("please donot try to do this!");
  }

  const currentTime = Date.now();
  const otpGeneratedTime = userData[0].otpGeneratedTime;

  if (currentTime - otpGeneratedTime > 120000) {
    res.redirect("/forgotPassword");
  }

  const hashedNewPassword = bcrypt.hashSync(newPassword, 8);
  /// MATCH vayo vaney
  //   const userData = await users.findAll({
  //     email : email
  //    })
  //    userData[0].password = hashedNewPassword
  //    await userData[0].save()
  await users.update(
    {
      password: hashedNewPassword,
    },
    {
      where: {
        email: email,
      },
    }
  );
  res.redirect("/login");
};
