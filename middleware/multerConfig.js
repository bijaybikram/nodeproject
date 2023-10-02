const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // logic to validate the filetype(mimetype)
    const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      cb(
        new Error(
          "invalid filetype! Only support Images files like jpg, png, jpeg."
        )
      ); //callback(cb) error
      return;
    }
    console.log(file.mimetype);

    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = {
  multer,
  storage,
};
