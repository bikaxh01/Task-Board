import express from "express";
import { config } from "dotenv";
import {
  createBoard,
  getAllBoards,
  signIn,
  signUp,
} from "./controller/controller";
import cookieParser from "cookie-parser";
import { validateUser } from "./middleware/auth";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json("OK");
});

app.post("/sign-up", signUp);
app.post("/sign-in", signIn);
app.post("/create-board", validateUser, createBoard);
app.get("/get-boards", validateUser, getAllBoards);

app.listen(3000, () => console.log(`Running at 3000`));
