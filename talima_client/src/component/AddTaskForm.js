import { useState } from "react";
import axios from "axios";
import CategorySelector from "./CategorySelector";

function AddTaskForm(props) {
    const [task, setTask] = useState({
        taskTitle: '',
        taskBody: '',
        taskCategory: '',
        taskTag: '',
        taskStatus: ''
    })
    const [selectedCategory, setSelectedCategory] = useState('');

    function handleInput(event) {
        setTask({ ...task, [event.target.name]: event.target.value })
        console.log(event.target.name)
        console.log(task)
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('/api/task', { task })
            .then(response => {
                console.log('Task is added successfully');
                props.fetchData();
                setTask({ ...task, 'taskTitle': '', 'taskBody': '', 'taskCategory': '' })
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
            <label>category</label>
            <CategorySelector handleInput={handleInput} value={task.taskCategory} categories={props.categories}/>
            <label>tags</label>
            <input name="taskTag" onChange={handleInput} value={task.taskTag}></input>
            <label>status</label>
            <input name="taskStatus" onChange={handleInput} value={task.taskStatus}></input>
            <button>Add task</button>
        </form>
    )
}

export default AddTaskForm;