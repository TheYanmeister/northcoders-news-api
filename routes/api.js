const apiRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const usersRouter = require("./users-router");
const commentsRouter = require("./comments-router");
const topicsRouter = require("./topics-router");
const articlesRouter = require("./articles-router");

apiRouter
  .route("/")
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;
