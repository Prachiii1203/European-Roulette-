import { useState } from "react";

const SpinResult = ({ allbet }) => {
  const [resPlayer, setResPlayer] = useState([]);

  const displaySpinResult = (res) => {
    console.log(res);

    return setResPlayer(allbet.filter((abet) => abet.status === res));
  };

  return (
    <div>
      {" "}
      <button onClick={() => displaySpinResult("Win")}>Win</button>
      <button onClick={() => displaySpinResult("Loss")}>Loss</button>
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
        <p>No One</p>
      )}
    </div>
  );
};

export default SpinResult;
