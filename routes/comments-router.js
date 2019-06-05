const commentsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

commentsRouter.route("/").all(methodNotAllowed);

module.exports = commentsRouter;
