const connection = require("../db/connection");

const postCommemtToArticle = (article_id, userInput) => {
  const commentToInsert = { ...userInput };
  commentToInsert.article_id = article_id;
  commentToInsert.author = commentToInsert.username;
  delete commentToInsert.username;
  return connection
    .insert(commentToInsert)
    .into("comments")
    .returning("*");
};

module.exports = { postCommemtToArticle };
