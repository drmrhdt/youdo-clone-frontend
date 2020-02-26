const express = require("express");
const categories = require("./categories");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/categories", (req, res, next) => {
  res.status(200).json({
    message: "Categories fetched successfully",
    categories: categories
  });
});

module.exports = app;
