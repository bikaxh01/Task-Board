import DropComponent from "./DropComponent";
import { useBoardStore } from "../store/ColumeStore";
import Task, { type TaskProp } from "./Task";

interface ColumnProp {
  title: string;
  tasks: TaskProp[];
}

function Column(props: ColumnProp) {
  const col = useBoardStore((state) => state.columns);

  return (
    <div className="bg-black flex   flex-col  rounded-md min-h-56 min-w-[18rem] py-3 px-2  ">
      <h1 className="text-primary font-bold">{props.title}</h1>
      {props.tasks.map((task, i) => (
        <div className=" flex flex-col">
          <DropComponent col={props.title} index={i} />
          <Task
            col={props.title}
            key={i}
            id={task.id}
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
