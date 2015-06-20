var express = require("express");
var router = express.Router();
var indexController = require("../controller/homeController.js");

router.get("/", indexController.getHome);

module.exports = router;