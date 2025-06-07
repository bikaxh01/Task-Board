import React, { useEffect, useRef, useState } from "react";
import { useBoardStore, type Task } from "../store/ColumeStore";
import { sendRequest } from "../config";
import { useParams } from "react-router";

interface AddTaskProp {
  colName: string;
}

function AddTask({ colName }: AddTaskProp) {
  const [activeInput, setActiveInput] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<any>(null);
  const columns = useBoardStore((state) => state.columns);
  const updateCols = useBoardStore((state) => state.updateColumns);

  const { boardId } = useParams();
  useEffect(() => {
    if (activeInput) {
      inputRef.current.focus();
    }
  }, [activeInput]);

  const createCardHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();

      const res = await sendRequest({
        method: "post",
        isAuth: true,
        url: "create-task",
        body: { colName: colName, taskTitle: title, boardId: boardId },
      });
      const taskData: Task = res.data;
      if (!columns) return;

      updateCols({ ...columns, [colName]: [...columns[colName], taskData] });
    } catch (error: any) {
      console.log("🚀 ~ createCardHandler ~ error:", error);
    } finally {
      setTitle("");
      setActiveInput(false);
      setLoading(false);
    }
  };

  return (
    <div className="  rounded-md   mt-2 ">
      {activeInput && (
        <form
          onSubmit={createCardHandler}
          className="bg-gray-700   flex flex-col gap-2 p-2"
        >
          <input
            ref={inputRef}
            type=" text"
            onChange={(e) => setTitle(e.target.value)}
            className=" w-full h-[2rem] rounded-md p-2 text-xs text-white"
            placeholder="Enter Title"
          />
          <div className=" flex  gap-2">
            <button
              onClick={() => setActiveInput(false)}
              className=" bg-gray-500 text-white rounded-md text-xs p-2"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className=" bg-blue-500 text-white rounded-md text-xs p-2"
            >
              {loading ? "creating.." : " Add Card"}
            </button>
          </div>
        </form>
      )}
      {!activeInput && (
        <button
          className=" text-white text-xs w-full   bg-blue-500 hover:bg-blue-600 h-[2rem] rounded-md  "
          onClick={() => setActiveInput(true)}
        >
          Add a Card
        </button>
      )}
    </div>
  );
}

export default AddTask;
