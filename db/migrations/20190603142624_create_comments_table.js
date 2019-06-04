exports.up = function(knex, Promise) {
  console.log("creating comments table...");
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable
      .increments("comment_id")
      .unique()
      .primary();
    commentsTable.string("author").references("username");
    commentsTable.integer("article_id").references("article_id");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.date("created_at").defaultTo(knex.fn.now());
    commentsTable.text("body").notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("removing comments table...");
  return knex.schema.dropTable("comments");
};
