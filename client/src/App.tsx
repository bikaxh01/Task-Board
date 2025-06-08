import { Route, Routes } from "react-router";
import SignIn from "./pages/sign-in/signin.js";
import Dashboard from "./pages/dashboard/Dashboard";
import Board from "./pages/board/Board.js";
import Test from "./pages/board/component/MarkdownEditor.js";
import MarkdownEditor from "./pages/board/component/MarkdownEditor.js";
import { useState } from "react";

function App() {
  const [content, setContent] = useState("");
  return (
    <>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route
          path="test"
          element={<MarkdownEditor content={content} setContent={setContent} />}
        />

        <Route path="board">
          <Route path=":boardId" element={<Board />} />
        </Route>

        <Route path="sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
