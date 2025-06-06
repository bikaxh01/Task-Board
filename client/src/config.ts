import axios from "axios";

export const SERVER_BASE_URL = " http://localhost:3000";

export const METHODS = {
  POST: "post",
  GET: "get",
  PUT: "put",
  PATCH: "patch",
} as const;

interface HTTPRequest {
  method: (typeof METHODS)[keyof typeof METHODS];
  url: string;
  isAuth: boolean;
  body?: any;
}

export async function sendRequest({ method, isAuth, url, body }: HTTPRequest) {
  try {
    let res;
    const config = { withCredentials: isAuth };

    if (method === "get") {
      res = await axios.get(`${SERVER_BASE_URL}/${url}`, config);
    } else {
      res = await axios[method](`${SERVER_BASE_URL}/${url}`, body, config);
    }

    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}
