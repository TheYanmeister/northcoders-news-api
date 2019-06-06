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

const fetchCommentsByArticle = (article_id, queries) => {
  const { sort_by = "created_at", order = "desc" } = queries;
  return connection
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by, order)
    .returning("*");
};

module.exports = { postCommemtToArticle, fetchCommentsByArticle };
