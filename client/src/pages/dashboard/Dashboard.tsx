import { useEffect, useState } from "react";
import BoardCard, { type Board } from "./components/BoardCard";

import { sendRequest } from "../../config";
import CreateBoard from "./components/CreateBoard";
import { Loader } from "lucide-react";
import { useUser } from "../../hook/getUser";

function Dashboard() {
  const [boards, setBoards] = useState<Board[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
   const [user] = useUser()
   console.log("🚀 ~ Dashboard ~ user:", user)
   
  useEffect(() => {
    async function getBoards() {
      try {
        setLoading(true);
        const res = await sendRequest({
          method: "get",
          isAuth: true,
          url: "get-boards",
        });
        setBoards(res.data);
      } catch (error) {
        console.log("🚀 ~ getBoards ~ error:", error);
      } finally {
        setLoading(false);
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
          {loading ? (
            <div className=" w-full flex items-center justify-center">
              <Loader className=" animate-spin" />
            </div>
          ) : boards.length == 0 ? (
            <div className=" flex w-full items-center justify-center">
              <h1>No Boards create new</h1>
            </div>
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
