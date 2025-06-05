import React from "react";
import Task, { type TaskProp } from "./Task";
import DropComponent from "./DropComponent";

interface ColumnProp {
  title: string;
  tasks: TaskProp[];
}

function Column(props: ColumnProp) {
  return (
    <div className="bg-black flex   flex-col  rounded-md min-h-56 min-w-[18rem] py-3 px-2  ">
      <h1 className="text-primary font-bold">{props.title}</h1>
      {props.tasks.map((task, i) => (
        <div className=" flex flex-col">
          <DropComponent />
          <Task
            key={i}
            assignedUser={task.assignedUser}
            priority={task.priority}
            title={task.title}
          />
        </div>
      ))}
    </div>
  );
}

export default Column;
