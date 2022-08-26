"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
  uid: { type: String, unique: true },
  name: { type: String },
});
exports["default"] = mongoose_1["default"].model("User", UserSchema);
