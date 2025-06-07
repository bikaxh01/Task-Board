import express from "express";
import { config } from "dotenv";
import cors from "cors";
import {
  createBoard,
  createColumn,
  createTask,
  getAllBoards,
  getBoard,
  signIn,
  signUp,
} from "./controller/controller";
import cookieParser from "cookie-parser";
import { validateUser } from "./middleware/auth";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

app.get("/", (req, res) => {
  res.json("OK");
});

app.post("/sign-up", signUp);
app.post("/sign-in", signIn);
app.post("/create-board", validateUser, createBoard);
app.get("/get-boards", validateUser, getAllBoards);
app.get("/get-board", getBoard);
app.post("/create-task", validateUser, createTask);
app.post("/create-col", validateUser, createColumn);

app.listen(3000, () => console.log(`Running at 3000`));
