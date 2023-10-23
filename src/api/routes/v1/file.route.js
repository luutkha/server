const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/upload-file.controller");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");
const multer = require("multer");


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route("/upload").post(authorize(LOGGED_USER), upload.single("filename"), controller.create);

module.exports = router;
