import AddTask from "./addTask";
import DropComponent from "./DropComponent";

import { type TaskProp } from "./Task";
import Task from "./Task";

interface ColumnProp {
  title: string;
  tasks: TaskProp[];
}

function Column(props: ColumnProp) {
  return (
    <div className="bg-black flex   flex-col rounded-md   max-h-full   min-w-[18rem] py-3 px-2  ">
      <h1 className="text-primary font-bold ">{props.title}</h1>
      <div className="  w-full overflow-auto max-h-full  scrollbar-custom ">
        {props.tasks.length == 0 ? (
          <DropComponent col={props.title} index={0} />
        ) : (
          props.tasks.map((task, i) => (
            <div className=" flex flex-col">
              <DropComponent col={props.title} index={i} />
              <Task
                col={props.title}
                key={i}
                id={task.id}
                assignedUser={task.assignedUser}
                label={task.label}
                title={task.title}
              />
              <DropComponent col={props.title} index={i} />
            </div>
          ))
        )}
      </div>
      <AddTask colName={props.title} />
    </div>
  );
}

export default Column;
