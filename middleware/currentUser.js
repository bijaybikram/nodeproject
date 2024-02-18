const { decodeToken } = require("../services/decodeToken");
const { users } = require("../model");

exports.currentUser = async (req, res, next) => {
  const token = req.cookies.token;

  //check if token is given or not
  if (!token) {
    // if token is not provided and you want to continue as is and stop executing other code
    next();
    return;
  }

  // verify if token is legit or not
  const decryptedResult = await decodeToken(token, process.env.SECRETKEY);
  console.log(decryptedResult);

  // check if that user exist in table or not
  const userExist = await users.findAll({
    where: { id: decryptedResult.id },
  });

  if (userExist.length == 0) {
    res.send("user with that id doesn't exist!");
  } else {
    req.user = userExist;
    req.userId = userExist[0].id;
    next();
  }
};
