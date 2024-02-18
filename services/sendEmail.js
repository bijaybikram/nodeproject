const nodemailer = require("nodemailer");

// var options = {
//   email: "ajshd",
//   subject: "",
//   otp: "",
// };

const sendEmail = async (options, job) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.OTP_EMAIL,
      pass: process.env.OTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Apple Ball <becauseiam33@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: "Your otp is  " + options.otp,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
