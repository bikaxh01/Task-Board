import React, { useState } from "react";
import { sendRequest } from "../../../config";
import { toast } from "sonner";
import {  useNavigate } from "react-router";

function CreateBoard() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await sendRequest({
        method: "post",
        isAuth: true,
        url: "create-board",
        body: { title: title, description: description },
      });

      navigate(0);
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setTitle("");
      setDescription("");
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="font-semibold h-[2rem] rounded-md bg-blue-500 hover:bg-blue-700 text-white text-xs w-[8rem]"
      >
        Create Board
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <div
            className="bg-black bg-opacity-80 p-6 rounded-lg  w-[25rem] flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className=" flex items-center justify-center text-2xl font-semibold">
              <h1>Create New Board</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-white font-semibold mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2    rounded bg-gray-800 text-white focus:outline-primary"
                  required
                  placeholder="Enter Your Board Title"
                />
              </div>
              <div>
                <label className="block font-semibold text-white text-sm mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 resize-none  rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
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
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateBoard;
