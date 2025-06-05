export interface TaskProp {
  title: string;
  assignedUser: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
}

function Task({ assignedUser, priority, title }: TaskProp) {
  return (
    <div className="  rounded-md bg-[#22272B] hover:bg-gray-700  p-3" draggable>
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
