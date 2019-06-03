const {
  articlesData,
  topicsData,
  usersData,
  commentsData
} = require("../data");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .instert(topicsData)
        .returning("*");
    })
    .then(console.log);
};
