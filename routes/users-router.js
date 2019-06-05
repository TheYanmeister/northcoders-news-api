const usersRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");

usersRouter.route("/").all(methodNotAllowed);

module.exports = usersRouter;
