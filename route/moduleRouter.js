const express = require("express");
const { createModule } = require("../controller/moduleController");

const Router = express();

Router.route("/modules").post(createModule);

module.exports = Router;
