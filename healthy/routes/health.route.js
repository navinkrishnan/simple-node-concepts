const route = require("express").Router();
const healthController = require("../controller/health.controller");

route.get("/health",healthController.get);

module.exports = route;