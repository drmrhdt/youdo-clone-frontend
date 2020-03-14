const express = require("express");
const categories = require("./categories");
const fs = require("fs");

const tasks = JSON.parse(fs.readFileSync(`${__dirname}/tasks.json`));

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

app.get("/api/tasks", (req, res) => {
  res.status(200).json({
    message: "success",
    results: tasks.length,
    data: {
      tasks
    }
  });
});

app.get("/api/task/:id", (req, res) => {
  const id = +req.params.id;
  const task = tasks.find(task => task.id === id);

  res.status(200).json({
    status: "success",
    data: {
      task
    }
  });
});

app.post("/api/task", (req, res) => {
  const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  const newTask = { id, ...req.body };
  tasks.push(newTask);

  fs.writeFile(`${__dirname}/tasks.json`, JSON.stringify(tasks), err => {
    res.status(201).json({
      status: "success",
      data: {
        newTask
      }
    });
  });
});

module.exports = app;
