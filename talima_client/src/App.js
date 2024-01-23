import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './component/TaskComponent';
import AddTaskForm from './component/AddTaskFormComponent';
import Filter from './component/FilterComponent';


function App() {

  const [tasks, setTasks] = useState();
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState();

  function fetchData() {
    const allTasks = axios.get('/api/task')
      .then((response) => {
        setTasks(response.data.tasks)
        console.log(response.data.tasks)
      })
      .catch((error) => {
        console.error('Talima client error: ' + error);
      })
  }


  function fetchCateogries() {
    const allCategories = axios.get('/api/category')
    .then(response => {
      setCategories(response.data.categories)
    })
    .catch(error => {
      console.error('Talima client: ' + error)
    })
  }

  useEffect(() => { // TBD: when getting an empty array the server responds with a 304 error code, check that out
    fetchData();
    fetchCateogries();
  }, [])

  function handleCheckbox(event) {
    const taskIndex = event.target.parentNode.id;
    const isChecked = event.target.checked;

    setSelectedTasks(prevSelection => {
      if (isChecked) {
        return [...prevSelection, taskIndex];
      }
      return prevSelection.filter(index => index !== taskIndex);
    })
  }

  // Delete selected tasks
  function handleDelete() {
    axios.delete('/api/task', { data: { selectedTasks: selectedTasks } })
      .then(response => {
        console.log('Tasks were deleted successfully');
        fetchData();
      })
      .catch(error => {
        console.error("Talima client: " + error);
      })
  }

  // filter tasks
  function handleFilter(event) {
    axios.get(`/api/task/${event.target.value}`)
      .then((response) => {
        setTasks(response.data.tasks)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Talima error: ' + error)
      }) 
  }


  return (
    <div className="App">
      <h1>Hi...</h1>
      <h2>You can add tasks here</h2>
      <AddTaskForm fetchData={fetchData} categories={categories}/>
      <h2>Or if you would like to delete selected tasks</h2>
      <button onClick={handleDelete}>Delete selected</button>
      <h2>Filter tasks?</h2>
      <p>Category filter:</p>
      <Filter array={categories} name="categoryFilter" value={selectedFilter} handleFilter={handleFilter}/>
      <h2>Here are some tasks</h2>
      <ul>
        {tasks && tasks.map((task, index) => {
          // TBD: 2 elements with the same id is not allowed
          return <li key={index} id={task._id}> 
            <input type='checkbox' onClick={handleCheckbox}></input>
            <Task id={task._id}
              title={task.title}
              body={task.body}
              createdAt={task.createdAt}
              category={task.category.name}
              tags={task.tags}
              state={task.state} />
          </li>
        })}
      </ul>
    </div>
  );
}

export default App;
