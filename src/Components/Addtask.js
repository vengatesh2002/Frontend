import "./Addtask.css";
import React, { useState } from "react";
import axios from "axios";
function Addtask(props) {
  const [task, settask] = useState("");
  const addtask = () => {
    if (task.trim() === "") {
      return;
    } else {
      axios
        .post("http://localhost:8000/api/tasks", {
          todo: task,
          isComplete: false,
        })
        .then((res) => {
          settask("");
          props.addTask(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="addtask">
      <input
        type="text"
        placeholder="Add Task ......"
        value={task}
        onChange={(event) => settask(event.target.value)}
      ></input>
      <button onClick={() => addtask()}>ADD</button>
    </div>
  );
}
export default Addtask;
