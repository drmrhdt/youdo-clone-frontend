const express = require("express");
const categories = require("./categories");
const tasksPreview = require("./task-preview.test");
const fs = require("fs");

const formTasks = JSON.parse(fs.readFileSync(`${__dirname}/form-tasks.json`));

const app = express();

app.use(express.json());

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

app.get("/api/categories", (req, res) => {
  res.status(200).json({
    status: "success",
    results: categories.length,
    data: {
      categories
    }
  });
});

app.get("/api/tasks-preview", (req, res) => {
  res.status(200).json({
    message: "success",
    data: {
      tasksPreview
    }
  });
});

app.get("/api/task/:id", (req, res) => {
  const id = +req.params.id;
  const task = tasksPreview.find(task => task.id === id);

  res.status(200).json({
    status: "success",
    data: {
      task
    }
  });
});

app.post("/api/task", (req, res) => {
  let id;
  if (formTasks.length) {
    id = formTasks[formTasks.length - 1].id + 1;
  } else id = 1;

  const newTask = { id, ...req.body };
  formTasks.push(newTask);

  fs.writeFile(
    `${__dirname}/form-tasks.json`,
    JSON.stringify(formTasks),
    err => {
      res.status(201).json({
        status: "success",
        data: {
          newTask
        }
      });
    }
  );
});

module.exports = app;
