import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setPlayers }) => {
  const [noofUser, setNoOfuser] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const addNoOfUser = (e) => {
    const no = e.target.value;
    setNoOfuser(no);
    localStorage.setItem("players", no);
    if (no > 10 || no < 2) {
      setMsg("only 2-10 players are allowed to play and no special charcter");
    } else {
      setMsg("");
    }
  };

  const preventInvalid = (e) => {
    const notValid = ["e", "E", ".", "+", "-"];
    if (notValid.includes(e.key)) {
      e.preventDefault();
    }
  };

  const startGame = () => {
    if (noofUser >= 2 && noofUser <= 10) {
      setPlayers(noofUser);
      navigate("/casino")
    }
  };

  return (
    <>
        <div className="userDashboard">
          <label>Enter number of user</label>
          <br />
          <input
            type="number"
            value={noofUser}
            className="inputPlayer"
            onChange={addNoOfUser}
            onKeyDown={preventInvalid}
          />
          <br />
          {msg && <span style={{ color: "red", fontSize: "14px" }}>{msg}</span>}
          <br />
          <button onClick={startGame}>Start Game</button>
        </div>
    </>
  );
};

export default Dashboard;
