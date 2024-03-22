const {
  renderRegisterForm,
  registerUser,
  renderLoginForm,
  loginUser,
  logOut,
  renderForgotPassword,
  checkForgotPassword,
  renderOtpForm,
  handleOTP,
  renderChangePasswordForm,
  handleChangePassword,
} = require("../controller/auth/authController");
const catchError = require("../services/catchError");

const router = require("express").Router();

// app.get("/register", registerUser)
router
  .route("/register")
  .get(renderRegisterForm)
  .post(catchError(registerUser));
router.route("/login").get(renderLoginForm).post(catchError(loginUser));
router.route("/logout").get(catchError(logOut));
router
  .route("/forgotPassword")
  .get(catchError(renderForgotPassword))
  .post(catchError(checkForgotPassword));
router.route("/otp").get(renderOtpForm);
router.route("/otp/:id").post(handleOTP);
router.route("/changePassword").get(renderChangePasswordForm);
router.route("/changePassword/:email/:otp").post(handleChangePassword);

module.exports = router;
