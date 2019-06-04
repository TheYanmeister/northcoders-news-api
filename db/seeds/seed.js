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
      console.log("inserting topics data...");
      return knex("topics").insert(topicsData);
    })
    .then(() => {
      console.log("inserting users data...");
      return knex("users").insert(usersData);
    })
    .then(() => {
      console.log("inserting articles data...");
      const formattedArticles = formatDate(articlesData);
      return knex("articles")
        .insert(formattedArticles)
        .returning("*");
    })
    .then(articlesRows => {
      let formattedComments = formatDate(commentsData);
      const refObj = createRefObj(formattedComments, articlesRows);
      formattedComments = formatComments(commentsData, refObj);
      console.log("inserting comments data...");
      return knex("comments").insert(formattedComments);
    });
};
