import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dbUtil from "./dbUtil/dbUtil";

// Preparing ingredients...
const app = express();
const port = process.env.PORT || 9000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// cors configs
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.get("/task", async (req, res) => {
  const tasks = await dbUtil.getTasks();
  return res.status(200).json({
    tasks: tasks,
  });
});

app.get("/task/last", async (req, res) => {
  const lastTask = await dbUtil.getLastTask();
  return res.status(200).json({
    lastTask: lastTask,
  });
});

app.get("/flag", async (req, res) => {
  const flags = await dbUtil.getFlags();
  return res.status(200).json({
    flags: flags,
  });
});

app.post("/task", async (req, res) => {
  await dbUtil.addTask(req.body);
  return res.status(200).json({});
});

app.put("/task/:id", async (req, res) => {
  try {
    await dbUtil.editTask(req.params.id, req.body);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Could not update task, please try again later" });
  }
});

app.patch("/task/:id", async (req, res) => {
  await dbUtil.completeTask(req.params.id);
  return res.status(200).json({ success: true });
});

app.delete("/task/:id", async (req, res) => {
  try {
    await dbUtil.deleteTask(req.params.id);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log("Talima is listening");
});
