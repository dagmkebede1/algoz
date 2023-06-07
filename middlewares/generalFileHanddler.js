const multer = require("multer");
const AppError = require("../utils/AppError");

// storage Strategies for PDF
const storageForPdf = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, "./public/resources/note");
    } else {
      cb({ error: "file type not supported" });
    }
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `course-note-${req.user.id}-${Date.now()}.${ext}`);
  },
});

// Storage Strategies for CV PDF
const storageForCV = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, "./public/cv");
    } else {
      cb(new AppError("Only PDF is Supported", 404));
    }
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `CV-${req.user.id}-${Date.now()}.${ext}`);
  },
});

// Storage Strategies for QA Image/ IMAGE
const storageForQAImages = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, "./public/img/QA");
    } else {
      cb(new AppError("Only Image type jpeg/jpg/png are Supported"));
    }
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `QA-${req.user.id}-${Date.now()}.${ext}`);
  },
});

// Storage Strategies for Video
const storageForVideo = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "video/gif" ||
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/wmv"
    ) {
      cb(null, "./public/resources/video");
    } else {
      cb({ error: "file type not supported" });
    }
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.originalname}-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const uploadPDF = multer({
  storage: storageForPdf,
});

const uploadQAImage = multer({
  storage: storageForQAImages,
});

const uploadVideo = multer({
  storage: storageForVideo,
});

const uploadCV = multer({
  storage: storageForCV,
});

let QAImageHandler = uploadQAImage.single("image");
let uploadCVHandler = uploadCV.single("cv");

let noteUploadHandler = uploadPDF.fields([{ name: "note", maxCount: 5 }]);

let videoHandler = uploadVideo.fields([{ name: "video", maxCount: 10 }]);

module.exports = {
  QAImageHandler,
  uploadCVHandler,
  noteUploadHandler,
  videoHandler,
};
