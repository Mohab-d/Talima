import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import Task from "./models/Task.js";
import Category from "./models/Category.js";


// Preparing ingredients...
const app = express();
const port = process.env.PORT;
const __dirname = dirname(fileURLToPath(import.meta.url));


//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());


// Connect db
mongoose.connect(process.env.DB_URL);


// db functions
// fetch tasks
async function fetchTask(filter) {
  try {
    const tasks = await Task.find(filter);
    return tasks
  } catch (error) {
    console.error('Talima server: ' + error);
    throw error;
  }
}


// add task
async function addTask(task) {
  try {
    // await Category.create(task.category); // TODO: find the best way to handle this
    const categoryExist = await fetchFromCollection(Category, {name: task.category})
    if(categoryExist.length === 0) {
      await Category.create({name: task.category})
    }
    await Task.create(task)
  } catch (error) {
    console.error('Talima server: ' + error);
    throw error;
  }
}


// fetch from collection
async function fetchFromCollection(collection, filter) {
  try {
  const data = collection.find(filter);
  return data;
  } catch(error) {
    console.error('Talima server: ' + error)
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

// get tasks according to category
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
app.post('/api/task', async (req, res) => {
  try {
    const task = {
      title: req.body.task.taskTitle,
      body: req.body.task.taskBody,
      category: req.body.task.taskCategory
    }

    const response = await addTask(task);
    res.status(200).send({ succes: true })
  } catch (error) {
    console.error('Talima server: ' + error);
    res.status(500).send({ error: `Could not add the task to the database` });
  }
})


// update task
app.patch('/api/task', async (req, res) => {
  try {
    const taskId = req.body.id;
    const existingTask = await fetchTask({_id: taskId})

    if (!existingTask) {
      res.status(404).send({ error: 'Oops!, this task does not exist' });
    }

    // Note: this syntax is used to update object in immutable way
    // if the first and second objects have exact properties
    // the second object would overwrite the first one's
    console.log(existingTask)
    const updatedTask = { ...existingTask._doc, ...req.body.editedTask };

    await Task.findByIdAndUpdate(taskId, updatedTask, { new: true });
    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Talima server: ' + error);
    res.status(500).send({ error: 'Could not update task' })
  }
})


// delete task/tasks
app.delete('/api/task', async (req, res) => {
  try {
    const taskIds = req.body.selectedTasks;
    const deletedTasksCount = await Task.deleteMany({ _id: { $in: taskIds } });
    res.status(200).send({ message: `${deletedTasksCount} tasks where deleted` });
  } catch (error) {
    console.error('Talima server: ' + error);
    res.status(500).send({ error: 'Could not delete selected tasks' })
  }
})


// Serve this awsome app
app.listen(port, () => {
  console.log(`Talima server is listening on port ${port}`);
})