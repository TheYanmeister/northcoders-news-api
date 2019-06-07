const commentsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { incVotesForComment } = require("../controllers/comments-controllers");

commentsRouter.route("/").all(methodNotAllowed);

commentsRouter
  .route("/:comment_id")
  .patch(incVotesForComment)
  .all(methodNotAllowed);

module.exports = commentsRouter;
