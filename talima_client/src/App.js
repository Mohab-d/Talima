import React, { useState, useEffect } from 'react';
import Task from './component/Task';
import axios from 'axios';


function App() {

  const [tasks, setTasks] = useState();

  useEffect(() => {
    const allTasks = axios.get('/api/tasks')
      .then((response) => {
        setTasks(response.data.allTasks)
      })
      .catch((error) => {
        console.error('Talima client error: ' + error);
      })
  }, [])


  return (
    <div className="App">
      <h1>Hi...</h1>
      <h2>Here are some tasks</h2>
      <ul>
        {tasks && tasks.map((task, index) => {
          return <li key={index} id={index}>
            <Task title={task.title}
              body={task.body}
              createdAt={task.createdAt}
              tags={task.tags}
              state={task.state} />
          </li>
        })}
      </ul>
    </div>
  );
}

export default App;
