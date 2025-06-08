import React, { useState } from "react";

import { toast } from "sonner";
import type { TaskDetailProp } from "../../../types";
import { useBoardStore } from "../../../store/ColumeStore";

function TaskDetail({
  setActiveDetail,
  col,
  id,
  label: initialLabel,
  title: initialTitle,
  description: initialDescription,
}: TaskDetailProp) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [label, setLabel] = useState(initialLabel);

  const [loading, setLoading] = useState(false);

  const columns = useBoardStore((state) => state.columns);
  const updateCols = useBoardStore((state) => state.updateColumns);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!columns) return;

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

  return (
    <div
      onClick={() => {
        setActiveDetail(false);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div
        className="bg-black bg-opacity-80 p-6 rounded-lg  w-[25rem] flex flex-col gap-5"
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
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 resize-none rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
              rows={3}
              placeholder="Description"
            />
          </div>
          <div className="flex justify-end gap-2">
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
