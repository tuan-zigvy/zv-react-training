const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const uuidv1 = require("uuid/v1");
const cors = require("cors");
const Yup = require("yup");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

const port = process.env.PORT || 9000;
const router = express.Router();

app.use(cors());

const yupQuery = Yup.object({
  name: Yup.string().notRequired().strict(),
  completed: Yup.boolean().notRequired(),
});

const currentTodos = [
  {
    id: "M9gdBMpsvvWrWvgpL",
    name: "To do 1",
    completed: false,
  },
  {
    id: "M9gdBMpsvvWrWvgpL1",
    name: "To do 2",
    completed: false,
  },
  {
    id: "M9gdBMpsvvWrWvgpL4",
    name: "To do 3",
    completed: false,
  },
  {
    id: "M9gdBMpsvvWrWvgpL5",
    name: "To do 4",
    completed: true,
  },
];

router.get("/todos", async function (req, res) {
  try {
    const query = await yupQuery.validate(req.query, { stripUnknown: true });

    if (!Object.keys(query).length) {
      res.json(currentTodos);
      return;
    }
    const result = currentTodos.filter((todo) => {
      let isMatch = false;
      Object.keys(query).forEach((key) => {
        if (typeof query[key] !== "string") {
          isMatch = todo[key] === query[key];
        } else {
          isMatch = todo[key].toLowerCase().includes(query[key].toLowerCase());
        }
      });
      return isMatch;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/todos", function (req, res) {
  currentTodos.push({
    id: uuidv1(),
    name: req.body.name,
    completed: false,
  });
  res.json(currentTodos.at(-1));
});

router.put("/todos/:todoId", function (req, res) {
  const todoId = req.params.todoId;

  const todo = currentTodos.find(({ id }) => id === todoId);
  Object.keys(req.body).forEach((field) => {
    if (todo[field] !== undefined) todo[field] = req.body[field];
  });

  res.json(todo);
});

router.delete("/todos/:todoId", function (req, res) {
  const todoId = req.params.todoId;
  const index = currentTodos.findIndex(({ id }) => todoId === id);
  currentTodos.splice(index, 1);
  res.json({});
});

app.use("/", router);

app.listen(port);
console.log("Server running on port " + port);
