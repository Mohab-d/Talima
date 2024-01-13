import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { time, timeStamp } from "console";
import { escape } from "querystring";


// Preparing ingredients...
const app = express();
const port = process.env.PORT;
const __dirname = dirname(fileURLToPath(import.meta.url));


//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


// Connect db
mongoose.connect(process.env.DB_URL);


// db schemas
const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  state: {
    type: String,
    enum: ['Working', 'Waiting', 'Done', 'Delayed', 'Cancelled']
  },
  category: {
    type: String,
    default: 'None'
  }
})


// db models configs
const Task = mongoose.model('Task', taskSchema);


// db functions
// fetch tasks
async function fetchTask(filter) {
  try {
    const tasks = await Task.find(filter);
    return tasks;
  } catch (error) {
    console.error('Talima server: ' + error);
    throw error;
  }
}


// add task
async function addTask(task) {
  try {
    await Task.insertOne(task);
    return true;
  } catch(error) {
    console.error('Talima server: ' + error);
    throw error;
  }
}


// The api
// get all tasks
app.get('/api/task', async (req, res) => {
  try {
    const tasks = await fetchTask({});
    res.status(200).send({ tasks: tasks });
  } catch (error) {
    res.status(500).send({ error: 'Could not fetch data from database' })
  }
})

// get tasks accourding to category
app.get('/api/task/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const tasks = await fetchTasks({
      category: category
    });
    res.status(200).send({ tasks: tasks });
  } catch (error) {
    res.status(500).send({ error: 'Could not fetch data from database' })
  }
})


// add task
get.post('api/task/add', async (req, res) => {
  const task = req.body.task;
  try {
    const response = await addTask(task);
    escape.status(200).send({succes})
  }
})



// Serve this awsome app
app.listen(port, () => {
  console.log(`Talima server is listening on port ${port}`);
})