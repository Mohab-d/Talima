import { useState } from "react";
import axios from "axios";
import CategorySelector from "./CategorySelectorComponent";

function AddTaskFormComponent(props) {
    const [task, setTask] = useState({
        taskTitle: '',
        taskBody: '',
        taskCategory: '',
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
            <CategorySelector handleInput={handleInput} name="taskCategory" value={task.taskCategory} categories={props.categories}/>
            <label>status</label>
            <input name="taskStatus" onChange={handleInput} value={task.taskStatus}></input>
            <button>Add task</button>
        </form>
    )
}

export default AddTaskFormComponent;