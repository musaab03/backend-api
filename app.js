const express = require("express");
const app = express();

const { internalErrorHandler, customErrorHandler } = require("./errors");

const { sendCategories } = require("./controllers/categories");

const {
  sendReview,
  sendUpdatedReview,
  sendAllReviews,
} = require("./controllers/reviews");

const { sendUsers } = require("./controllers/users");

const {
  sendComments,
  addComment,
  deleteComment,
} = require("./controllers/comments");

app.use(express.json());

app.get("/api/categories", sendCategories);
app.get("/api/reviews/:id", sendReview);
app.get("/api/reviews", sendAllReviews);
app.get("/api/users", sendUsers);
app.get("/api/reviews/:id/comments", sendComments);

app.post("/api/reviews/:id/comments", addComment);

app.patch("/api/reviews/:id", sendUpdatedReview);

app.delete("/api/comments/:id", deleteComment);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});
app.use(customErrorHandler);
app.use(internalErrorHandler);

module.exports = app;
