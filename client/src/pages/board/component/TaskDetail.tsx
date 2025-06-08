import React, { useState } from "react";

import { toast } from "sonner";
import type { TaskDetailProp } from "../../../types";
import { useBoardStore } from "../../../store/ColumeStore";
import MarkdownEditor from "./MarkdownEditor";

function TaskDetail({
  setActiveDetail,
  col,
  id,
  label: initialLabel,
  title: initialTitle,
  description: initialDescription,
}: TaskDetailProp) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription || "");
  const [label, setLabel] = useState(initialLabel);

  const [loading, setLoading] = useState(false);

  const columns = useBoardStore((state) => state.columns);
  const updateCols = useBoardStore((state) => state.updateColumns);

  if (!columns) return;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // can call update api to update Task detail with ?taskId=taskId

      const updatedColumns = {
        ...columns,
        [col]: columns[col].map((task) =>
          task.id === id ? { ...task, title, description, label } : task
        ),
      };

      updateCols(updatedColumns);
      toast.success("Updated Successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActiveDetail(false);
      setLoading(false);
    }
  };
  
  const deleteTask = (e: React.MouseEvent) => {
    e.preventDefault();
    const finalColTask = columns[col].filter((t) => id !== t.id);
    console.log("🚀 ~ deleteTask ~ finalColTask:", finalColTask)
    
    const finalCols = { ...columns, [col]: finalColTask };
    console.log("🚀 ~ deleteTask ~ finalCols:", finalCols)
    updateCols(finalCols);
    toast.success("Deleted Successfully");
    setActiveDetail(false)
  };

  return (
    <div
      onClick={() => {
        setActiveDetail(false);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div
        className="bg-black bg-opacity-80 p-6 rounded-lg   w-fit flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" flex items-center justify-center text-2xl font-semibold">
          <h1 className=" text-white">Update Task</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-white font-semibold mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-primary"
              required
              placeholder="Enter Your Board Title"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-1">Label</label>
            <select
              value={label}
              //@ts-expect-error no err
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-primary"
              required
            >
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-white text-sm mb-1">
              Description
            </label>
            <MarkdownEditor content={description} setContent={setDescription} />
          </div>
          <div className="flex justify-end gap-2">
            <button
              disabled={loading}
              onClick={deleteTask}
              type="button"
              className="px-4 py-2 rounded disabled:bg-red-400 bg-red-500 text-white w-full hover:bg-red-700"
            >
              {loading ? "Deleting..." : "Delete Task"}
            </button>
            <button
              disabled={loading}
              type="submit"
              className="px-4 py-2 rounded disabled:bg-blue-400 bg-blue-500 text-white w-full hover:bg-blue-700"
            >
              {loading ? "updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskDetail;
