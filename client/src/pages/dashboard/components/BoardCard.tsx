
import { useNavigate } from "react-router";
import { formatDate } from "../../../config";

export interface Board {
  id: string;
  title: string;
  description: string | null;
  adminId: string;
  createdAt: string;
  updatedAt: string;
}

function BoardCard({
  createdAt,

  description,
  id,
  title,
}: Board) {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/board/${id}`);
  };
  return (
    <div
      onClick={handleNavigation}
      className="  bg-gray-900 hover:bg-gray-950 transition duration-150  w-full h-[6rem] rounded-md px-3 py-2"
    >
      <div className=" flex flex-col gap-3">
        <div className=" ">
          <h2 className="  font-bold text-2xl">{title}</h2>
          <p className=" truncate text-xs text-primary">{description}</p>
        </div>
        <p className=" text-xs text-primary">
          {" "}
          createdAt: {formatDate(createdAt)}
        </p>
      </div>
    </div>
  );
}

export default BoardCard;
