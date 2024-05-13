import React, { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
import axios from "axios";
import { response } from "express";

function App() {
  interface Task {
    id: number;
    title: string;
    text: string;
    status: string;
  }
  const [selectedFolder, setSelectedFolder] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    // get tasks
    try {
      const response = await axios.get('http://localhost:8080/task')
      const newTasks = response.data.tasks
      setTasks(newTasks)
    } catch(err) {
      console.error(err)
    }
  };

  const getLastTask = async () => {
    // get tasks
    try {
      const response = await axios.get('http://localhost:8080/task/last')
      setTasks((prev: any) => ([...prev, response.data.lastTask]))
    } catch(err) {
      console.error(err)
    }
  };

  const refresh = async () => {
    try {
    await getTasks();
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="App flex flex-col items-center bg-gray-900 h-fit min-h-screen w-full p-4">
      <div className="flex w-full p-6 shadow-lg shadow-cyan-500/50 rounded-xl">
        <div className="flex justify-center items-center text-cyan-600 font-bold text-8xl w-full h-full">
          Talima
        </div>
        <div className="w-full h-1/3">
          <TaskForm refresh={refresh} getLastTask={getLastTask}/>
        </div>
      </div>
      <div className="flex flex-col mt-10 gap-5 justify-center items-center w-1/2 p-6 shadow-cyan-500/50 shadow-lg rounded-xl">
        {!(tasks.length > 0) ? (
          <h1 className="text-cyan-600 font-bold text-4xl">
            You don't have any tasks.
          </h1>
        ) :
        tasks.map((task) => (
              <Task
              key={task.id}
              id={task.id}
              title={task.title}
              text={task.text}
              setTasks={setTasks}
              refresh={refresh}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
