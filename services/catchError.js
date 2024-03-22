// code for handling errors asynchronously

// module.exports = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch((err) => {
//       return res.send(err.message);
//     });
//   };
// };

// module.exports = (fn) => {
//   return (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch((err) => {
//       return res.send(err.message || "An error occurred");
//     });
//   };
// };

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      res.send(err.message);
      //  const path  =req.route.path
      //   console.log(err.message)
      //   req.flash("error","Something went wrong")
      //   res.redirect(path)
      //   return
    });
  };
};
