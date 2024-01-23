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
  priority: [String],
  state: {
    type: String,
    default: 'Waiting',
    enum: ['Working', 'Waiting', 'Done', 'Delayed', 'Cancelled']
  },
  category: {name: String}
})


const Task = mongoose.model('Task', taskSchema);

export default Task;