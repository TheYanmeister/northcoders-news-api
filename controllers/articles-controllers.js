const {
  fetchArticleById,
  patchVoteCount,
  fetchSeveralArticals
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

exports.sendMultipleArticles = (req, res, next) => {
  const queries = req.query;
  fetchSeveralArticals(queries)
    .then(articles => {
      if (articles.length === 0)
        return Promise.reject({
          status: 400,
          msg: "No articles found"
        });
      res.status(200).send({ articles });
    })
    .catch(console.log);
};
