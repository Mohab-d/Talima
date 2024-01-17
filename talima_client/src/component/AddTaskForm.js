import { useState } from "react";
import axios from "axios";

function AddTaskForm(props) {
    const [task, setTask] = useState({
        taskTitle: '',
        taskBody: ''
    })

    function handleInput(event) {
        setTask({ ...task, [event.target.name]: event.target.value })
        console.log(task)
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('/api/task', { task })
            .then(response => {
                console.log('Task is added successfully');
                props.fetchData();
                setTask({...task, 'taskTitle': '', 'taskBody': ''})
            })
            .catch(error => {
                console.log('Could not add task');
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input name="taskTitle" onChange={handleInput} value={task.taskTitle}></input>
            <label>body</label>
            <input name="taskBody" onChange={handleInput} value={task.taskBody}></input>
            <button>Add task</button>
        </form>
    )
}

export default AddTaskForm;