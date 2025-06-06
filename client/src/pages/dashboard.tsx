import { useEffect, useState } from "react";
import BoardCard, { type Board } from "./components/boardCard";
import CreateBoard from "./components/createBoard";
import { sendRequest } from "../config";

function Dashboard() {
  const [boards, setBoards] = useState<Board[] | []>([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getBoards() {
      try {
        const res = await sendRequest({
          method: "get",
          isAuth: true,
          url: "get-boards",
        });
        setBoards(res.data);
      } catch (error) {
        console.log("🚀 ~ getBoards ~ error:", error);
      }
    }
    getBoards();
  }, []);

  return (
    <div className=" h-screen bg-gray-900  flex  flex-col items-center justify-center gap-2   text-white">
      <div className=" w-full flex items-end justify-end px-16">
        <CreateBoard />
      </div>
      <div className="h-[90%] w-[95%]  rounded-2xl flex flex-col overflow-x-auto items-start gap-5 bg-gray-800 py-4 px-4 ">
        <div className=" w-full gap-6 flex  items-end justify-end">
          <div className=" flex gap-2">
            <input
              type="text"
              className=" rounded-md bg-gray-700 h-[2rem] px-2 text-xs"
              placeholder="Search by title"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className=" w-full gap-2 flex flex-col">
          {boards.length == 0 ? (
            <div>No Boards create new</div>
          ) : (
            boards
              .filter((b) =>
                searchQuery
                  ? b.title
                      .toLocaleLowerCase()
                      .startsWith(searchQuery.toLowerCase())
                  : b
              )
              .map((board: Board) => <BoardCard {...board} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
