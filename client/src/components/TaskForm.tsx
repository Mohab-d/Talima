import axios from "axios";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { SubmitTarget } from "react-router-dom/dist/dom";
import CustomeInput from "./CustomeInput";
import CustomeTextArea from "./CustomeTextArea";
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AddCircle, EditAttributes } from "@mui/icons-material";
import EditAttributesIcon from '@mui/icons-material/EditAttributes';

const TaskForm = (props: any) => {
  const [task, setTask] = useState({
    title: props.title || "",
    text: props.text || "",
    status: props.status || "waiting"
  });

  const clear = (e: any) => {
    e.preventDefault();
    if(props.editMode) {
      props.setEditMode(false)
      return
    }
    setTask({
      title: "",
      text: "",
      status: "waiting"
    });
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(props.editMode) {
      const edited = await handleEdit();
      if(edited) {
        console.log(props.taskId)
        props.setTask(() => {
            return {
              id: props.taskId,
              ...task
            }
          })
      }
    } else {
      await handleAdd();
      await props.getLastTask();
    }
    clear(e);
    await props.refresh();
  };

  const handleAdd = async () => {
    // submit form
    const response = await axios.post('http://localhost:8080/task',task)
  };

  const handleEdit = async () => {
    const response = await axios.put(`http://localhost:8080/task/${props.taskId}`,task)
    return response.data.success
  }


  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 items-center p-4 bg-gray-800 rounded-lg shadow-lg w-full"
      >
        <label className="text-cyan-600 text-center text-xl font-bold">
          {!props.editMode ? 'Add a task' : 'Edit task'}
        </label>
        <CustomeInput
        value={task.title}
        onChange={(e:any)=>{setTask((prev) => ({ ...prev, title: e.target.value }))}}/>
        <CustomeTextArea
        value={task.text}
        onChange={(e: any) => {
            setTask((prev) => ({ ...prev, text: e.target.value })); }}/>
        <div className="flex gap-5">
          <button className="text-cyan-600 text-lg size-6 font-bold">
            {props.editMode ? <EditAttributes /> : <AddCircle />
}          </button>
          <button
            onClick={clear}
            className="text-lg size-6 text-red-600 font-bold"
          >
          <CancelIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
