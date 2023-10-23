const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/group.controller");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");
const multer = require("multer");


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route("/:id").get(authorize(LOGGED_USER), controller.get);
router.route("/").get(authorize(LOGGED_USER), controller.list);
router.route("/").post(authorize(LOGGED_USER), upload.single("avatar"), controller.create);
router.route("/").put(authorize(LOGGED_USER), upload.single("avatar"), controller.update);

module.exports = router;
