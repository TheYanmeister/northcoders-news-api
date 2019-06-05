process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
  });

  describe("/api/topics", () => {
    it("GET status:200 and to send an object of all the topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(body => {
          expect(body.ok).to.equal(true);
          const testTopics = JSON.parse(body.text).topics;
          expect(testTopics).to.be.an("array");
          expect(testTopics[0]).to.contain.keys(["slug", "description"]);
        });
    });
  });

  describe("/api/users/:username", () => {
    it("GET status:200 and to send an object of the user's data specified using the usename provided", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(body => {
          expect(body.ok).to.equal(true);
          const testUser = JSON.parse(body.text).userData;
          expect(testUser).to.be.an("array");
          expect(testUser[0]).to.contain.keys([
            "username",
            "avatar_url",
            "name"
          ]);
        });
    });
  });

  describe("/api/articles/:article_id", () => {
    it("GET status:200 and to send an object of the article specified by the params", () => {
      return request(app)
        .get("/api/articles/12")
        .expect(200)
        .then(body => {
          expect(body.ok).to.equal(true);
          const testArticle = JSON.parse(body.text).articleData;
          expect(testArticle).to.be.an("array");
          expect(testArticle[0]).to.contain.keys([
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          ]);
        });
    });
    it("PATCH status:200 and to send an object of the article with the now updated vote property", () => {
      return request(app)
        .patch("/api/articles/6")
        .send({ inc_votes: 50 })
        .expect(200)
        .then(body => {
          expect(body.ok).to.equal(true);
          const testArticle = JSON.parse(body.text).articleData;
          expect(testArticle).to.be.an("array");
          expect(testArticle[0]).to.contain.keys([
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes"
          ]);
          expect(testArticle[0].votes).to.equal(50);
        });
    });
  });
});
