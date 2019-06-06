const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  sendArticle,
  updateVotes
} = require("../controllers/articles-controllers");
const { postComment } = require("../controllers/comments-controllers");

articlesRouter.route("/").all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(updateVotes)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .all(methodNotAllowed);

module.exports = articlesRouter;
