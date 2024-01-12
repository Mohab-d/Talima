import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { time, timeStamp } from "console";


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
  }
})


// db models configs
const Task = mongoose.model('Task', taskSchema);


// The api
app.get('/api/tasks', async (req, res) => {
  try {
    const allTasks = Task.find({}).then((tasks) => {
      res.status(200).send({
        allTasks: tasks
      })
    })
  } catch(error) {
    console.error('Talima: ' + error);
    res.status(500).send({error: 'Could not get data from the db'})
  }
})



// Serve this awsome app
app.listen(port, () => {
  console.log(`Talima is listening on port ${port}`);
})