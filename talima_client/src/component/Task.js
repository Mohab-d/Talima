import React, { useState } from "react";
import axios from "axios";


function Task(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: props.title,
    body: props.body
  })

  function handleEditing() {
    setEditedTask({title: props.title, body: props.body})
    setIsEditing(!isEditing);
  }

  function handleChange(event) {
    setEditedTask({...editedTask, [event.target.name]: event.target.value })
  }

  function handleSave() {
    setIsEditing(false);
    axios.patch('/api/task', { editedTask: editedTask, id: props.id })
      .then(response => {
        console.log('Task was updated successfully');
        // TBD: check if we need to refetch data or not
      })
      .catch(error => {
        console.error('Could not update task');
      })
  }

  return (
    <div>
      <button onClick={handleEditing}>{isEditing ? 'Cancel' : 'Edit Task'}</button>
      {isEditing ? (
        <button onClick={handleSave}>Save Changes</button>
      ) : null}
      {isEditing ? (
        <input name="title" onChange={handleChange} value={editedTask.title}></input>
      ) : (
        <h3>{editedTask.title}</h3>
      )}
      {isEditing ? (
        <input name="body" onChange={handleChange} value={editedTask.body}></input>
      ) : (
        <h4>{editedTask.body}</h4>
      )}
      <p>{props.createdAt}</p>
      <ul>
        {props.tags.forEach(tag => {
          <li>{tag}</li>
        })}
      </ul>
      <p>{props.state}</p>
    </div>
  )
}

export default Task;