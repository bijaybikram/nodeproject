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
  .get(catchError(renderRegisterForm))
  .post(catchError(registerUser));
router
  .route("/login")
  .get(catchError(renderLoginForm))
  .post(catchError(loginUser));
router.route("/logout").get(catchError(logOut));
router
  .route("/forgotPassword")
  .get(catchError(renderForgotPassword))
  .post(catchError(checkForgotPassword));
router.route("/otp").get(catchError(renderOtpForm));
router.route("/otp/:id").post(catchError(handleOTP));
router.route("/changePassword").get(catchError(renderChangePasswordForm));
router
  .route("/changePassword/:email/:otp")
  .post(catchError(handleChangePassword));

module.exports = router;
