"use strict";
var express = require("express");
var blog = require("../controllers/blog");
var router = express.Router();
router.get("/", blog["default"].readAll);
router.get("/read/:blogID", blog["default"].read);
router.post("/create", blog["default"].create);
router.post("/query", blog["default"].query);
router.patch("/update/:blogID", blog["default"].update);
router["delete"]("/:blogID", blog["default"].deleteBlog);
module.exports = router;
