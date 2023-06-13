const express = require("express");
const {
  createModule,
  getAllModules,
  getSingleModule,
  updateModule,
  deleteModule,
} = require("../controller/moduleController");
const { protect, restrictTo } = require("../controller/AuthController");

const Router = express();

Router.route("/modules").post(protect, createModule).get(getAllModules);
Router.route("/modules/:id")
  .get(getSingleModule)
  .patch(updateModule)
  .delete(deleteModule);
module.exports = Router;
