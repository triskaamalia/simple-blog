"use strict";
exports.__esModule = true;
var http = require("http");
var express = require("express");
var logging = require("./config/logging");
var config = require("./config/config");
var mongoose = require("mongoose");
var firebase_admin = require("firebase-admin");
var user = require("./routes/user");
var blog = require("./routes/blog");
var router = express();
/** Server Handling */
var httpServer = http.createServer(router);
/** Connect to Firebase */
var serviceAccount = require('./config/serviceAccountKey.json');
firebase_admin.initializeApp({
    credential: firebase_admin.credential.cert(serviceAccount)
});
/** Connect to Mongo */
mongoose["default"]
    .connect(config.mongo.url, config.mongo.options)
    .then(function (result) {
    logging["default"].info('Mongo Connected');
})["catch"](function (error) {
    logging["default"].error(error);
});
/** Log the request */
router.use(function (req, res, next) {
    logging["default"].info("METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    res.on('finish', function () {
        logging["default"].info("METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - STATUS: [").concat(res.statusCode, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    });
    next();
});
/** Parse the body of the request */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
/** Rules of our API */
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
//Routes 
router.use('/users', user);
router.use('/blogs', blog);
/** Error handling */
router.use(function (req, res, next) {
    var error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
/** Listen */
httpServer.listen(config.server.port, function () {
   return logging["default"].info("Server is running ".concat(config.server.host, ":").concat(config.server.port)); });
