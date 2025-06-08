import { useEffect, useState } from "react";

import { useBoardStore } from "../../store/ColumeStore";
import { sendRequest } from "../../config";
import { useParams } from "react-router";
import Column from "./component/Column";
import AddColumn from "./component/AddColumn";
import { Loader2 } from "lucide-react";

function Board() {
  const { boardId } = useParams();

  const updateColumns = useBoardStore((state) => state.updateColumns);
  const columns = useBoardStore((state) => state.columns);
  const [loading, setLoading] = useState(false);

  // get all columns from BE and push to store
  useEffect(() => {
    async function getColumns() {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
    getColumns();
  }, []);

  if (loading)
    return (
      <div className=" h-screen w-screen bg-gray-800 flex items-center justify-center">
        <Loader2 className=" animate-spin size-24" />
      </div>
    );

  return (
    <div className="bg-gray-900 flex items-center    justify-center h-screen w-screen">
      <div className="h-[90%] w-[95%] py-4 px-2   scrollbar-custom rounded-2xl flex overflow-y-auto items-start gap-5 bg-gray-800 ">
        {columns &&
          Object.keys(columns).map((col, i) => (
            <Column key={i} title={col} tasks={columns[col]} />
          ))}
        <AddColumn />
      </div>
    </div>
  );
}

export default Board;
