import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { sendRequest } from "../config";
import { useNavigate } from "react-router";

export function useUser() {
  const user = useUserStore((state) => state.user);
  const updateUserStore = useUserStore((state) => state.updateUser);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await sendRequest({
          method: "get",
          isAuth: true,
          url: "get-user",
        });
        updateUserStore(res.data);
      } catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);
        navigate("/sign-in");
      }
    };
    getUser()
  }, []);
  return [user];
}
