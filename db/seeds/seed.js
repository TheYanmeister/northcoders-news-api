const {
  articlesData,
  topicsData,
  usersData,
  commentsData
} = require("../data");
const {
  formatDate,
  formatComments,
  createRefObj
} = require("../../utils/index");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics").insert(topicsData);
    })
    .then(() => {
      return knex("users").insert(usersData);
    })
    .then(() => {
      const formattedArticles = formatDate(articlesData);
      return knex("articles")
        .insert(formattedArticles)
        .returning("*");
    })
    .then(articlesRows => {
      let formattedComments = formatDate(commentsData);
      const refObj = createRefObj(formattedComments, articlesRows);
      formattedComments = formatComments(commentsData, refObj);
      return knex("comments").insert(formattedComments);
    });
};
