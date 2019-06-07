const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  sendArticle,
  updateVotes,
  sendMultipleArticles
} = require("../controllers/articles-controllers");
const {
  postComment,
  sendCommentsByArticle
} = require("../controllers/comments-controllers");

articlesRouter
  .route("/")
  .get(sendMultipleArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(updateVotes)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .get(sendCommentsByArticle)
  .post(postComment)
  .all(methodNotAllowed);

module.exports = articlesRouter;
