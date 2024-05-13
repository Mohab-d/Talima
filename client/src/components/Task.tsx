import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import axios from 'axios';
import { useState } from 'react';
import TaskForm from './TaskForm';

const Task = (props: any) => {
  const [task, setTask] = useState({
      id: props.id,
      title: props.title,
      text: props.text,
      status: props.status
    })
  const [editMode, setEditMode] = useState(false)

  // handle complete is for future update
  const handleComplete = async () => {
    try {
      const response = await axios.patch(`http://localhost:8080/task/${task.id}`)
      await props.refresh()
    } catch(err) {
      console.error(err)
    }
  };


  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/task/${task.id}`)
      await props.refresh()
    } catch(err) {
      console.error(err)
    }
  };

  return (
    <div className="w-full flex p-4 text-cyan-600 rounded-lg bg-gray-800">
    {editMode && <TaskForm
      taskId = {task.id}
      title={task.title}
      text={task.text}
      status={props.status}
      refresh={props.refresh}
      editMode={editMode}
      setEditMode={setEditMode}
      setTask={setTask}
    />}
    <div className={`grow ${editMode ? 'hidden' : ''}`}>
      <div className="text-6xl w-full font-bold">{task.title}</div>
      <div className="text-2xl h-fit w-full">{task.text}</div>
    </div>
    <div className={`flex flex-col gap-4 items-center ${editMode ? 'hidden' : ''}`}>
      <button className="hover:bg-gray-900 p-1 rounded-md" onClick={handleComplete}><CheckCircleIcon /></button>
      <button className="hover:bg-gray-900 p-1 rounded-md" onClick={() => {setEditMode(true)}}><EditNoteIcon /></button>
      <button className="hover:bg-gray-900 p-1 rounded-md" onClick={handleDelete}><DeleteIcon /></button>
      </div>
    </div>
  );
};

export default Task;
