import mongoose from "mongoose";

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
    default: 'Waiting',
    enum: ['Working', 'Waiting', 'Done', 'Delayed', 'Cancelled']
  },
  category: {
    type: String,
    default: 'None'
  }
})


const Task = mongoose.model('Task', taskSchema);

export default Task;