const jwt = require("jsonwebtoken");
const { users } = require("../model");
const promisify = require("util").promisify;
//2nd alternative for this
// const { promisify } = require("util");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  // check if token given or not
  if (!token) {
    // res.send("Token must be provided");
    return res.redirect("/login");
  }
  // verify if token is legit or not
  const decryptedResult = await promisify(jwt.verify)(
    token,
    process.env.SECRETKEY
  );
  console.log(decryptedResult);

  // check if that user exist in table or not
  const userExist = await users.findAll({ where: { id: decryptedResult.id } });

  if (userExist.length == 0) {
    res.send("user with that id doesn't exist!");
  } else {
    req.user = userExist;
    req.userId = userExist[0].id;
    next();
  }
};
