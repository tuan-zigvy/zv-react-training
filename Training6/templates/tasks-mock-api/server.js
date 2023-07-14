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
  status: Yup.boolean().notRequired(),
});

const currentTasks = [
  {
    id: "M9gdBMpsvvWrWvgpL",
    name: "Deploy project",
    status: false,
  },
  {
    id: "M9gdBMpsvvWrWvgpL1",
    name: "Create CRUD",
    status: false,
  },
  {
    id: "M9gdBMpsvvWrWvgpL4",
    name: "Connect postgres",
    status: false,
  },
  {
    id: "M9gdBMpsvvWrWvgpL5",
    name: "Debug",
    status: true,
  },
];

router.get("/task", async function (req, res) {
  try {
    const query = await yupQuery.validate(req.query, { stripUnknown: true });

    if (!Object.keys(query).length) {
      res.json(currentTasks);
      return;
    }
    const result = currentTasks.filter((todo) => {
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

router.post("/task", function (req, res) {
  currentTasks.push({
    id: uuidv1(),
    name: req.body.name,
    status: Math.random() > 0.5 ? true : false,
  });
  res.json(currentTasks.at(-1));
});

router.put("/task/:taskId", function (req, res) {
  const taskId = req.params.taskId;

  const index = currentTasks.findIndex(({ id }) => id === taskId);
  const task = currentTasks[index];

  Object.keys(req.body).forEach((key) => {
    if (key === "status") {
      if (task.status) {
        res.status(500).json({
          error: "Status is completed so can`t not update",
        });
        return;
      } else {
        task.status = Math.random() > 0.6 ? true : false;
      }
    } else if (task[key] !== undefined) {
      task[key] = req.body[key];
    }
  });

  currentTasks[index] = task;
  res.json(task);
});

router.delete("/task/:taskId", function (req, res) {
  const taskId = req.params.taskId;
  const index = currentTasks.findIndex(({ id }) => taskId === id);
  currentTasks.splice(index, 1);
  res.json({});
});

app.use("/", router);

app.listen(port);
console.log("Server running on port " + port);
