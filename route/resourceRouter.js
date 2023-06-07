const express = require("express");
const Router = express();
const AuthController = require("../controller/AuthController");
const {
  videoHandler,
  noteUploadHandler,
} = require("../middlewares/generalFileHanddler");
const {
  uploadVideo,
  getAllVideos,
  getSingleVideo,
  editVideo,
  deleteVideo,
  deleteMultipleVideos,
  // Notes Controller
  uploadNotes,
  deleteMultipleNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  editNotes,
  //
  addTask,
  updateTask,
  getSingleTask,
  getAllTasks,
  deleteTask,
  deleteMultipleTask,
} = require("../controller/resourceController");

// Protection from unauthorized users
Router.use(AuthController.protect);

// Video Routing routes
Router.route("/Resource/videos")
  .post(AuthController.restrictTo("admin"), videoHandler, uploadVideo)
  .get(getAllVideos)
  .delete(deleteMultipleVideos);

Router.route("/Resource/videos/:id")
  .get(getSingleVideo)
  .patch(AuthController.restrictTo("admin"), editVideo)
  .delete(AuthController.restrictTo("admin"), deleteVideo);

// Notes Routing routes
Router.route("/Resource/notes")
  .post(AuthController.restrictTo("admin"), noteUploadHandler, uploadNotes)
  .get(getAllNotes)
  .delete(deleteMultipleNote);

Router.route("/Resource/notes/:id")
  .get(getSingleNote)
  .patch(AuthController.restrictTo("admin"), editNotes)
  .delete(AuthController.restrictTo("admin"), deleteNote);

// Tasks Routing route
Router.route("/Resource/tasks")
  .post(AuthController.restrictTo("admin"), addTask)
  .get(getAllTasks)
  .delete(deleteMultipleTask);
Router.route("/Resource/tasks/:id")
  .get(getSingleTask)
  .patch(AuthController.restrictTo("admin"), updateTask)
  .delete(AuthController.restrictTo("admin"), deleteTask);

module.exports = Router;
