import React, { useEffect } from "react";
import Column from "./Column";
import { useBoardStore } from "../store/ColumeStore";
import { sendRequest } from "../config";
import { useParams } from "react-router";
import AddColumn from "./addColumn";

function V2() {
  const { boardId } = useParams();

  const updateColumns = useBoardStore((state) => state.updateColumns);
  const columns = useBoardStore((state) => state.columns);

  useEffect(() => {
    async function getColumns() {
      try {
        const res = await sendRequest({
          method: "get",
          isAuth: true,
          url: `get-board?boardId=${boardId}`,
        });

        const finalCol: any = {};

        res.data.column.forEach((col: any) => {
          finalCol[col.title] = col.task;
        });

        updateColumns(finalCol);
      } catch (error) {
        console.log("🚀 ~ getColumns ~ error:", error);
      }
    }
    getColumns();
  }, []);

  if (!columns) return <>null</>;

  return (
    <div className="bg-gray-900 flex items-center    justify-center h-screen w-screen">
      <div className="h-[90%] w-[95%] py-4 px-2   scrollbar-custom rounded-2xl flex overflow-y-auto items-start gap-5 bg-gray-800 ">
        {Object.keys(columns).map((col, i) => (
          <Column key={i} title={col} tasks={columns[col]} />
        ))}
        <AddColumn />
      </div>
    </div>
  );
}

export default V2;
