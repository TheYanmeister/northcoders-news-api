exports.up = function(knex, Promise) {
  console.log("creating articles table...");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable
      .integer("article_id")
      .unique()
      .primary();
    articlesTable.string("title").notNullable();
    articlesTable.text("body").notNullable();
    articlesTable.integer("votes").defaultTo(0);
    articlesTable.string("topic").references("slug");
    articlesTable.string("author").references("username");
    articlesTable.date("created_at").notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("removing articles table...");
  return knex.schema.dropTable("articles");
};
