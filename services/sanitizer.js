const sanitizeHtml = require("sanitize-html");

const sanitizer = (req, res, next) => {
  console.log(req.body, "From Sanitizer");
  // req.body = {title: "asdf", subtitle:"asdf"}
  // looping the object
  for (const key in req.body) {
    // console.log(req.body[key]);
    req.body[key] = sanitizeHtml(req.body[key], {
      allowedTags: ["strong", "mark"],
      allowedAttributes: {},
    });
  }
  next();
};

module.exports = sanitizer;
