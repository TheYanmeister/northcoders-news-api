const topicsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { sendAllTopics } = require("../controllers/topics-controllers");

topicsRouter
  .route("/")
  .get(sendAllTopics)
  .all(methodNotAllowed);

module.exports = topicsRouter;
