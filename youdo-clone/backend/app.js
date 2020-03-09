const express = require("express");
const categories = require("./categories");
const tasksPreview = require("./task-preview.test");

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
  next();
});

app.use("/api/tasks-preview", (req, res, next) => {
  res.status(200).json({
    message: "Tasks previews fetched successfully",
    tasksPreview: tasksPreview
  });
  next();
});

app.get("/api/task/:id", (req, res) => {
  const id = +req.params.id;
  const task = tasksPreview.find(task => task.id === id);

  res.status(200).json({
    status: "success",
    data: {
      task: task
    }
  });
});

module.exports = app;
