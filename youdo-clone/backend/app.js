const express = require("express");
const fs = require("fs");

const subcategories = JSON.parse(
  fs.readFileSync(`${__dirname}/subcategories.json`)
);
const tasks = JSON.parse(fs.readFileSync(`${__dirname}/tasks.json`));
const categories = JSON.parse(fs.readFileSync(`${__dirname}/categories.json`));
const executors = JSON.parse(fs.readFileSync(`${__dirname}/executors.json`));

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

app.get("/api/subcategories/:id", (req, res) => {
  const id = +req.params.id;
  const filteredSubcategories = subcategories.filter(
    subCat => subCat.category === id
  );

  res.status(200).json({
    status: "success",
    results: filteredSubcategories.length,
    data: {
      subcategories: filteredSubcategories
    }
  });
});

app.get("/api/task/new/:categoryFromURL/:subcategoryFromURL", (req, res) => {
  const { subcategoryFromURL } = req.params;
  const currentSubcategory = subcategories.find(
    subcategory => subcategory.code === subcategoryFromURL
  );
  const currentCategory = categories.find(
    category => category.id === currentSubcategory.category
  );
  res.status(200).json({
    status: "success",
    data: {
      currentCategory,
      currentSubcategory
    }
  });
});

app.get("/api/tasks", (req, res) => {
  res.status(200).json({
    status: "success",
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

app.get("/api/executors", (req, res) => {
  res.status(200).json({
    status: "success",
    results: executors.length,
    data: {
      executors
    }
  });
});

module.exports = app;

// const propToLowerCase = array => {
//   array.forEach(obj => {
//     for (const key in obj) {
//       const titleCase = key.slice(0, 1).toLowerCase() + key.slice(1);
//       if (Array.isArray(obj[key])) {
//         obj[titleCase] = obj[key];
//         propToLowerCase(obj[titleCase]);
//         delete obj[key];
//       } else {
//         obj[titleCase] = obj[key];
//         delete obj[key];
//       }
//     }
//   });
//   return array;
// };

// const newObj = propToLowerCase(subcategoriesJson);

// fs.writeFile(`${__dirname}/test.json`, JSON.stringify(newObj), err => {
//   console.log(err);
// });
