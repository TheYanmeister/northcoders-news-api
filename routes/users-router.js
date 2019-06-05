const usersRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { sendUserData } = require("../controllers/users-controllers");

usersRouter.route("/").all(methodNotAllowed);

usersRouter
  .route("/:username")
  .get(sendUserData)
  .all(methodNotAllowed);

module.exports = usersRouter;
