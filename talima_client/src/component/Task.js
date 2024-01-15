import React from "react";

function Task(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <h4>{props.body}</h4>
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