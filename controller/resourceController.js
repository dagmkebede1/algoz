const { videos, tasks, notes } = require("../model/resource");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");

// Video Resource Logic
const uploadVideo = CatchAsync(async (req, res) => {
  const { title } = req.body;
  let obj = {};
  obj.title = title;
  if (req.file) {
    obj.location = req.file.filename;
  }
  videos.create(obj);
  await videos.save();
});
