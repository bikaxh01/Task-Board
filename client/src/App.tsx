import { Route, Routes } from "react-router";
import SignIn from "./pages/sign-in/signin.js";
import V2 from "./component/v2";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="board">
          <Route path=":boardId" element={<V2 />} />
        </Route>
        <Route path="sign-up" element={<V2 />} />
        <Route path="sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
