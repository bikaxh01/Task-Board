import { EllipsisVertical } from "lucide-react";
import type { ColumnProp } from "../../../types";
import AddTask from "./AddTask";
import DropComponent from "./DropComponent";
import Task from "./Task";
import { useState } from "react"; // Add this import
import { useBoardStore } from "../../../store/ColumeStore";
import { toast } from "sonner";
import { useUser } from "../../../hook/getUser";

function Column(props: ColumnProp) {
  const [open, setOpen] = useState(false); // Dialog state
  const [user] = useUser();

  const columns = useBoardStore((state) => state.columns);
  const updateCol = useBoardStore((state) => state.updateColumns);

  if (!columns) return;

  // Delete Column Logic
  const handleDelete = () => {
    delete columns[props.title];
    const finalCols = { ...columns };
    updateCol(finalCols);
    setOpen(false);
    toast.success("Column Deleted");
  };

  return (
    <div className="bg-black flex   flex-col rounded-md   max-h-full   min-w-[18rem] py-3 px-2  ">
      <div className=" flex justify-between">
        <h1 className="text-primary font-bold ">{props.title}</h1>
        <div className="  text-white relative">
          <button onClick={() => setOpen(true)}>
            <EllipsisVertical className=" size-4" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded shadow-lg z-10">
              <div className="p-2">
                <button
                  className="text-red-600 hover:underline w-full text-left"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="mt-2 text-white hover:underline w-full text-left"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="  w-full overflow-auto max-h-full  scrollbar-custom ">
        {props.tasks.length == 0 ? (
          <DropComponent col={props.title} index={0} />
        ) : (
          props.tasks.map((task, i) => (
            <div className=" flex flex-col" key={i}>
              <DropComponent col={props.title} index={i} />
              <Task
                col={props.title}
                id={task.id}
                createdBy={user?.fullName.split(" ")[0]}
                assignedTo={task.assignedTo}
                label={task.label}
                dueDate={task.dueDate}
                title={task.title}
                description={task.description}
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
