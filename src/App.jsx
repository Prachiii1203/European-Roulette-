import { useState } from "react";
import Casino from "./component/Casino";
import Dashboard from "./component/Dashboard";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem("players")),
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard setPlayers={setPlayers} />} />
        <Route path="/casino" element={<Casino playerno={players} />} />
      </Routes>
    </>
  );
};

export default App;
