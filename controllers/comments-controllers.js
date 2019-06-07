const {
  postCommemtToArticle,
  fetchCommentsByArticle,
  incrementVotes
} = require("../models/comments-models");

exports.postComment = (req, res, next) => {
  const article_id = req.params.article_id;
  const userInput = req.body;
  postCommemtToArticle(article_id, userInput)
    .then(commentData => res.status(200).send({ commentData }))
    .catch(next);
};

exports.sendCommentsByArticle = (req, res, next) => {
  const article_id = req.params.article_id;
  const queries = req.query;
  fetchCommentsByArticle(article_id, queries)
    .then(comments => {
      if (comments.length === 0)
        return Promise.reject({
          status: 400,
          msg: "No comments found for this article"
        });
      res.status(200).send({ comments });
    })
    .catch(err => {
      next(err);
    });
};

exports.incVotesForComment = (req, res, next) => {
  const comment_id = req.params.comment_id;
  const votes = req.body.inc_votes;
  if (votes === undefined) votes = 0;
  incrementVotes(comment_id, votes)
    .then(commentData => res.status(200).send({ commentData }))
    .catch(next);
};
