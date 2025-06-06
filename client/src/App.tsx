import { Route, Routes } from "react-router";

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
        <Route path="sign-in" element={<V2 />} />
      </Routes>
    </>
  );
}

export default App;
