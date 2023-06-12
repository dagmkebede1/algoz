const express = require("express");
const {
  createModule,
  getAllModules,
  getSingleModule,
  updateModule,
  deleteModule,
} = require("../controller/moduleController");

const Router = express();

Router.route("/modules").post(createModule).get(getAllModules);
Router.route("/modules/:id")
  .get(getSingleModule)
  .patch(updateModule)
  .delete(deleteModule);
module.exports = Router;
