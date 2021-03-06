const commentsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  incVotesForComment,
  removeComment
} = require("../controllers/comments-controllers");

commentsRouter.route("/").all(methodNotAllowed);

commentsRouter
  .route("/:comment_id")
  .patch(incVotesForComment)
  .delete(removeComment)
  .all(methodNotAllowed);

module.exports = commentsRouter;
