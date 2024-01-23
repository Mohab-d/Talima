import { useState } from "react";
import axios from "axios";


function AddTaskComponent(props) {
  const [task, setTask] = useState();

  async function addTask(formData) {
    const response = await axios.post('/api/task', {
      title: formData.get('taskTitle'),
      body: formData.get('taskBody')
    })
    if(response === 200) {
      console.log('Task is added!');
    }
  }

  return(
    <form method="post" onSubmit={addTask} style={{display: 'flex', flexDirection: 'row'}}>
      <input name="taskTitle" placeholder="Task title"></input>
      <input name="taskBody" placeholder="Task body"></input>
      <button>Add task</button>
    </form>
  )
}

export default AddTaskComponent