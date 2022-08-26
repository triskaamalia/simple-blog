"use strict";
var express = require("express");
var user = require("../controllers/user");
var extractFirebaseInfo = require("../middleware/extractFirebaseInfo");
var router = express.Router();
router.get(
  "/validate",
  extractFirebaseInfo["default"],
  user["default"].validate
);
router.get("/read/:userID", user["default"].read);
router.post("/create", user["default"].create);
router.post("/login", user["default"].login);
router.get("/", user["default"].readAll);
module.exports = router;
