exports.up = function(knex, Promise) {
  console.log("creating comments table...");
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable
      .integer("comment_id")
      .unique()
      .primary();
    commentsTable.string("author").references("username");
    commentsTable.integer("article_id").references("article_id");
    commentsTable.integer("votes").defaultsTo(0);
    commentsTable.date("created_at").notNullable();
    commentsTable.text("body").notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("removing comments table...");
  return knex.schema.dropTable("comments");
};
