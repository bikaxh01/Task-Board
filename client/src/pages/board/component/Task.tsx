import type { TaskProp, Task } from "../../../types";
import { useState } from "react";
import TaskDetail from "./TaskDetail";

function TaskComponent({
  col,
  assignedTo,
  label,
  dueDate,
  title,
  id,
  description,
  createdBy,
}: TaskProp) {
  const [activeDetail, setActiveDetail] = useState(false);

  if (!col) return;

  // Drag card logic
  const handleDrag = (
    event: React.DragEvent,
    fromColumn: string,
    item: Task
  ) => {
    event.dataTransfer.setData("item", JSON.stringify(item));

    event.dataTransfer.setData("fromColumn", fromColumn);
  };

  return (
    <>
      <div
        className="  rounded-md bg-[#22272B]  hover:bg-gray-700  p-3"
        draggable
        onClick={() => setActiveDetail(true)}
        onDragStart={(e) =>
          handleDrag(e, col, {
            title,
            label,
            assignedTo,
            id,
            dueDate,
            description,
          })
        }
      >
        <div className=" flex gap-2 flex-col">
          <h2 className=" text-primary font-semibold w-full truncate">
            {title}
          </h2>
          <div className=" flex gap-2 items-start">
            {label && (
              <span
                className={` text-[10px]  px-1 flex  items-center justify-center rounded-md ${
                  label == "HIGH"
                    ? "text-red-500 hover:text-red-400"
                    : label == "MEDIUM"
                    ? "text-yellow-500 hover:text-yellow-400"
                    : "text-green-500 hover:text-green-400 "
                } `}
              >
                {label.toLocaleLowerCase()}
              </span>
            )}
            {assignedTo && (
              <span className="px-1 rounded-sm truncate  text-[10px] text-amber-300 hover:text-gray-100 flex items-center justify-center">
                assigned to: {assignedTo || "@bikash"}
              </span>
            )}
            {createdBy && (
              <span className="px-1 rounded-sm truncate  text-[10px] text-orange-400 hover:text-gray-100 flex items-center justify-center">
                created by: {createdBy}
              </span>
            )}
            {dueDate && (
              <span className="px-1 rounded-sm truncate  text-[10px] text-gray-300 hover:text-gray-100 flex items-center justify-center">
                Due Date: {dueDate}
              </span>
            )}
          </div>
        </div>
      </div>
      {activeDetail && (
        <TaskDetail
          setActiveDetail={setActiveDetail}
          assignedTo={assignedTo}
          id={id}
          label={label}
          dueDate={dueDate}
          title={title}
          description={description}
          col={col}
        />
      )}
    </>
  );
}

export default TaskComponent;
