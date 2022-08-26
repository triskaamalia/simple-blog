"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var BlogSchema = new mongoose_1.Schema(
  {
    title: { type: String, unique: true },
    author: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
    headline: { type: String },
    picture: { type: String },
  },
  {
    timestamps: true,
  }
);
exports["default"] = mongoose_1["default"].model("Blog", BlogSchema);
