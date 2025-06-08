import { Route, Routes } from "react-router";
import SignIn from "./pages/sign-in/signin.js";
import Dashboard from "./pages/dashboard/Dashboard";
import Board from "./pages/board/Board.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="board">
          <Route path=":boardId" element={<Board />} />
        </Route>
       
        <Route path="sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
