const {
  postCommemtToArticle,
  fetchCommentsByArticle,
  incrementVotes,
  deleteComment
} = require("../models/comments-models");

const { fetchArticleById } = require("../models/articles-models");

exports.postComment = (req, res, next) => {
  const article_id = req.params.article_id;
  const userInput = req.body;
  fetchArticleById(article_id)
    .then(articleData => {
      if (articleData.length === 0)
        return Promise.reject({
          status: 404,
          msg: "This article does not exist"
        });
      postCommemtToArticle(article_id, userInput)
        .then(([comment]) => res.status(201).send({ comment }))
        .catch(err => {
          if (err)
            return res
              .status(400)
              .send({ msg: "Body must contain keys username and body" });
        });
    })
    .catch(next);
};

exports.sendCommentsByArticle = (req, res, next) => {
  const article_id = req.params.article_id;
  const queries = req.query;
  fetchArticleById(article_id)
    .then(articleData => {
      if (articleData.length === 0)
        return Promise.reject({
          status: 404,
          msg: "This article does not exist"
        });
      fetchCommentsByArticle(article_id, queries)
        .then(comments => {
          if (comments.length === 0)
            return res.status(200).send({ comments: [] });
          res.status(200).send({ comments });
        })
        .catch(next);
    })
    .catch(next);
};

exports.incVotesForComment = (req, res, next) => {
  const comment_id = req.params.comment_id;
  let votes = req.body.inc_votes;
  if (votes === undefined) votes = 0;
  incrementVotes(comment_id, votes)
    .then(comment => {
      if (comment.length === 0)
        return Promise.reject({ status: 404, msg: "comment doesn't exist" });
      res.status(200).send({ comment: comment[0] });
    })
    .catch(next);
};

exports.removeComment = (req, res, next) => {
  const comment_id = req.params.comment_id;
  deleteComment(comment_id)
    .then(delCount => {
      if (delCount === 1) res.sendStatus(204);
      else if (delCount === 0)
        return Promise.reject({ status: 404, msg: "comment not found" });
    })
    .catch(next);
};
