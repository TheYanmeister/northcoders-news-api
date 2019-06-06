const { postCommemtToArticle } = require("../models/comments-models");

exports.postComment = (req, res, next) => {
  const article_id = req.params.article_id;
  const userInput = req.body;
  postCommemtToArticle(article_id, userInput)
    .then(commentData => res.status(200).send({ commentData }))
    .catch(next);
};
