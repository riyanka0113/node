

const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, path.join("./uploads/"));
  },
  // By default, multer removes file extensions so let's add them back
  filename(_req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const imageUpload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },

  fileFilter: function (_req, file, cb) {
    if (!file.mimetype.includes("image")) {
      return cb(new Error("invalid file extension"));
    }
    cb(null, true);
  },
});

module.exports = imageUpload;
