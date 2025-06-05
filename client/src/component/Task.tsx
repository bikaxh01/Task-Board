import type { Task } from "../store/ColumeStore";

export interface TaskProp {
  id: string;
  title: string;
  assignedUser: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  col?: string;
}

function Task({ col, assignedUser, priority, title,id }: TaskProp) {

  if(!col) return

  const handleDrag = (
    event: React.DragEvent,
    fromColumn: string,
    item: Task
  ) => {
    event.dataTransfer.setData("item", JSON.stringify(item));

    event.dataTransfer.setData("fromColumn", fromColumn);
  };

  return (
    <div
      className="  rounded-md bg-[#22272B] hover:bg-gray-700  p-3"
      draggable
      onDragStart={(e) =>
        handleDrag(e, col, { title, priority, assignedUser, id })
      }
    >
      <div className=" flex gap-2 flex-col">
        <h2 className=" text-primary font-semibold w-full truncate">{title}</h2>
        <div className=" flex gap-2 items-start">
          {priority && (
            <span
              className={` text-[10px]  px-1 flex  items-center justify-center rounded-md ${
                priority == "HIGH"
                  ? "text-red-500 hover:text-red-400"
                  : priority == "MEDIUM"
                  ? "text-yellow-500 hover:text-yellow-400"
                  : "text-green-500 hover:text-green-400 "
              } `}
            >
              {priority.toLocaleLowerCase()}
            </span>
          )}
          {assignedUser && (
            <span className="px-1 rounded-sm truncate  text-[10px] text-gray-300 hover:text-gray-100 flex items-center justify-center">
              {assignedUser}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Task;
