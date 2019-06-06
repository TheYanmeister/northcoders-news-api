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

  describe("/api/articles/:article_id/comments", () => {
    it("POST status:200 inserts a comment into the comments table when provided with the body, and  username in the body of the request and the article id in the params", () => {
      return request(app)
        .post("/api/articles/6/comments")
        .send({
          username: "bobbyjoe",
          body: "i am bobbyjoe and this is my comment"
        })
        .expect(200)
        .then(body => {
          expect(body.ok).to.equal(true);
          const testComment = JSON.parse(body.text).commentData;
          expect(testComment).to.be.an("array");
          expect(testComment[0]).to.contain.keys([
            "author",
            "comment_id",
            "article_id",
            "body",
            "created_at",
            "votes"
          ]);
          expect(testComment[0].body).to.eql(
            "i am bobbyjoe and this is my comment"
          );
        });
    });
    it("GET status:200 and to send an array of objects being the comments of the article passed in the params and accpets the queries sort by and order", () => {
      return request(app)
        .get("/api/articles/9/comments")
        .expect(200)
        .then(body => {
          expect(body.ok).to.equal(true);
          const testComments = JSON.parse(body.text).comments;
          expect(testComments).to.be.an("array");
          expect(testComments[0]).to.contain.keys([
            "author",
            "comment_id",
            "body",
            "created_at",
            "votes"
          ]);
        });
    });
    it("GET status:400 when sending a bad query", () => {
      return request(app)
        .get("/api/articles/9/comments?sort_by=authorr")
        .expect(400);
    });
  });
});
