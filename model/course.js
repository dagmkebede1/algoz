const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide course title"],
    unique: [true, "Can not Create a Course with the same title"],
    minlength: 1,
  },
  desc: {
    type: String,
    required: [true, "Please provide course description"],
    // minlength: 50
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
    // required: [true, 'Please provide course photo']
  },
  instructor: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  modules: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Module",
    },
  ],
});

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "instructor",
    select: "firstName lastName",
  }).populate({
    path: "modules",
    select: "",
  });
  next();
});
module.exports = mongoose.model("Course", courseSchema);
