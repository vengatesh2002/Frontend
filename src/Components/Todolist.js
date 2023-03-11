import "./Todolist.css";
import React from "react"; 
import "@blueprintjs/core/lib/css/blueprint.css";
import { Icon } from "@blueprintjs/core";
import axios from "axios";
function Todolist(props) {
  const todolist = props.todolist.map((task, index) => {
    const taskComplete = (task) => {
      axios
        .put(`http://localhost:8000/api/tasks/${task._id}`, {
          _id: task._id,
          todo: task.todo,
          isComplete: !task.isComplete,
        })
        .then((res) => props.taskComplete(res.data))
        .catch((err) => console.log(err));
    };
    const removeTask = (id) => {
      axios
        .delete(`http://localhost:8000/api/tasks/${id}`)
        .then((res) => props.removeTask(res.data))
        .catch((err) => console.log(err));
    };
    return (
      <li key={index}>
        <div style={{ display: "flex" }}>
          <Icon
            icon="tick"
            className={task.isComplete ? "isComplete" : "checkicon"}
          />
          <p
            className={task.isComplete ? "taskcomplete" : ""}
            onClick={() => {
              taskComplete(task);
            }}
          >
            {task.todo}
          </p>
        </div>
        <div>
          <Icon
            icon="annotation"
            className="edit"
            onClick={() => {
              props.tasktoUpdate(task);
              props.showPopup();
            }}
          />
          <Icon
            icon="trash"
            className="close"
            onClick={() => {
              removeTask(task._id);
            }}
          />
        </div>
      </li>
    );
  });
  return (
    <div className="tasklist">
      <ul>{todolist}</ul>
    </div>
  );
}
export default Todolist;

