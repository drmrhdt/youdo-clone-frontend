const express = require("express");
const categories = require("./categories");

const app = express();

app.use("/api/categories", (req, res, next) => {
  res
    .status(200)
    .json({ message: "Categories fetched successfully", categories });
});

module.exports = app;
