exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user[0].role;
    if (!roles.includes(userRole)) {
      res.send("You are not authorized to view this information!");
    } else {
      next();
    }
  };
};
