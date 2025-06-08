import React, { useEffect, useRef, useState } from "react";
import { useBoardStore } from "../../../store/ColumeStore";
import { sendRequest } from "../../../config";
import { useParams } from "react-router";

function AddColumn() {
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

  // Add new Column
  const createCol = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
      const res = await sendRequest({
        method: "post",
        isAuth: true,
        url: "create-col",
        body: { boardId: boardId, title },
      });
      const data = res.data;

      updateCols({ ...columns, [data.title]: data.task });
    } catch (error) {
      console.log("🚀 ~ createCol ~ error:", error);
    } finally {
      setActiveInput(false);
      setTitle("");
      setLoading(false);
    }
  };
  return (
    <div className="bg-black flex   flex-col  rounded-md min-h-fit min-w-[18rem] py-3 px-2  ">
      <h1 className="text-primary font-bold ">Add Column</h1>
      {activeInput && (
        <form onSubmit={createCol} className="  flex flex-col gap-2">
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
              {loading ? "creating.." : " Add Column"}
            </button>
          </div>
        </form>
      )}
      {!activeInput && (
        <button
          onClick={() => setActiveInput(true)}
          className=" bg-blue-500 rounded-md h-[2rem] text-white hover:bg-blue-600"
        >
          Add Column
        </button>
      )}
    </div>
  );
}

export default AddColumn;
