import { useEffect, useState } from "react";

const SpinResult = ({ allbet }) => {
  const [resPlayer, setResPlayer] = useState([]);
  const [msg, setMsg] = useState("Win");

  useEffect(() => setResPlayer(allbet.filter((abet) => abet.status === msg)), [msg]);
  return (
    <div>
      {" "}
      <button className="resultbtn" onClick={() => setMsg("Win")}>
        Win
      </button>
      <button className="resultbtn" onClick={() => setMsg("Loss")}>
        Loss
      </button>
      {resPlayer.length > 0 ? (
        resPlayer.map((abet, index) => (
          <>
            <p key={index} className="resultDisplay">
              <span>
                Player {abet.userId} {abet.status} {abet.amt}
              </span>
              <span>Bet Type: {abet.betType}</span>
              <small>
                Player {abet.userId} betted {abet.totalchip}
              </small>
            </p>
          </>
        ))
      ) : (
        <p>No One {msg}</p>
      )}
    </div>
  );
};

export default SpinResult;
