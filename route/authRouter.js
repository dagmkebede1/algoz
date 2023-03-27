const express = require("express");
const Router = express.Router();
const {
  profilePhotoUploader,
  resizeUserPhotoSignup,
} = require("../middlewares/userImageHanddler");
const AuthController = require("../controller/AuthController");

Router.route("/signup").post(
  profilePhotoUploader,
  resizeUserPhotoSignup,
  AuthController.signup
);

Router.route("/login").post(AuthController.login);
Router.route("/logout").get(AuthController.logout);
Router.route("/user/forgotPassword").post(AuthController.forgotPassword);
Router.route("/user/resetPassword/:token").patch(AuthController.resetPassword);
Router.route("/user/updateMyPassword").patch(
  AuthController.protect,
  AuthController.updatePassword
);

module.exports = Router;
