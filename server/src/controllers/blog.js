"use strict";
exports.__esModule = true;
var logging_1 = require("../config/logging");
var blog_1 = require("../models/blog");
var mongoose_1 = require("mongoose");
var create = function (req, res, next) {
  logging_1["default"].info("Attempting to register blog ...");
  var _a = req.body,
    author = _a.author,
    title = _a.title,
    content = _a.content,
    headline = _a.headline,
    picture = _a.picture;
  var blog = new blog_1["default"]({
    _id: new mongoose_1["default"].Types.ObjectId(),
    author: author,
    title: title,
    content: content,
    headline: headline,
    picture: picture,
  });
  return blog
    .save()
    .then(function (newBlog) {
      logging_1["default"].info("New blog created..");
      return res.status(200).json({ blog: newBlog });
    })
    ["catch"](function (error) {
      logging_1["default"].error(error.message);
      return res.status(500).json({
        message: error.message,
      });
    });
};
var read = function (req, res, next) {
  var _id = req.params.blogID;
  logging_1["default"].info("Incoming read for blog with id ".concat(_id));
  return blog_1["default"]
    .findById(_id)
    .populate("author")
    .then(function (blog) {
      if (blog) {
        return res.status(200).json({
          blog: blog,
        });
      } else {
        return res.status(404).json({
          error: "Blog not found.",
        });
      }
    })
    ["catch"](function (error) {
      logging_1["default"].error(error.message);
      return res.status(500).json({
        error: error.message,
      });
    });
};
var readAll = function (req, res, next) {
  logging_1["default"].info("Readall route called");
  return blog_1["default"]
    .find()
    .populate("author")
    .exec()
    .then(function (blogs) {
      return res.status(200).json({
        count: blogs.length,
        blogs: blogs,
      });
    })
    ["catch"](function (error) {
      logging_1["default"].error(error.message);
      return res.status(500).json({
        message: error.message,
      });
    });
};
var query = function (req, res, next) {
  logging_1["default"].info("Incoming query..");
  return blog_1["default"]
    .find(req.body)
    .populate("author")
    .exec()
    .then(function (blogs) {
      return res.status(200).json({
        count: blogs.length,
        blogs: blogs,
      });
    })
    ["catch"](function (error) {
      logging_1["default"].error(error.message);
      return res.status(500).json({
        message: error.message,
      });
    });
};
var update = function (req, res, next) {
  var _id = req.params.blogID;
  logging_1["default"].info("Incoming update for blog with id ".concat(_id));
  return blog_1["default"]
    .findById(_id)
    .exec()
    .then(function (blog) {
      if (blog) {
        blog.set(req.body);
        blog
          .save()
          .then(function (newBlog) {
            logging_1["default"].info("Blog updated..");
            return res.status(200).json({ blog: newBlog });
          })
          ["catch"](function (error) {
            logging_1["default"].error(error.message);
            return res.status(500).json({
              message: error.message,
            });
          });
      } else {
        return res.status(404).json({ error: "Blog not found." });
      }
    })
    ["catch"](function (error) {
      logging_1["default"].error(error.message);
      return res.status(500).json({
        message: error.message,
      });
    });
};
var deleteBlog = function (req, res, next) {
  var _id = req.params.blogID;
  logging_1["default"].warn("Incoming delet for blog with id ".concat(_id));
  return blog_1["default"]
    .findByIdAndDelete(_id)
    .exec()
    .then(function (blog) {
      if (blog) {
        return res.status(200).json({
          message: "Blog delete",
        });
      }
    })
    ["catch"](function (error) {
      logging_1["default"].error(error.message);
      return res.status(500).json({
        error: error.message,
      });
    });
};
exports["default"] = {
  create: create,
  read: read,
  readAll: readAll,
  query: query,
  update: update,
  deleteBlog: deleteBlog,
};
