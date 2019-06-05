const {
  fetchArticleById,
  patchVoteCount
} = require("../models/articles-models");

exports.sendArticle = (req, res, next) => {
  article_id = req.params.article_id;
  fetchArticleById(article_id)
    .then(articleData => res.status(200).send({ articleData }))
    .catch(next);
};

exports.updateVotes = (req, res, next) => {
  article_id = req.params.article_id;
  let votes = req.body.inc_votes;
  if (votes === undefined) votes = 0;
  patchVoteCount(article_id, votes)
    .then(articleData => {
      res.status(200).send({ articleData });
    })
    .catch(next);
};
