const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

articlesRouter.route("/").all(methodNotAllowed);

module.exports = articlesRouter;
