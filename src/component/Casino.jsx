import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";
import WheelSpin from "./WheelSpin";

function Casino({ playerno }) {
  const wheelNumbers = [];
  const Bet_type = [
    "Red",
    "Odd",
    "1st 12",
    "2nd 12",
    "3rd 12",
    "1-18/Lower",
    "19-36/Higer",
    "Even",
    "Black",
  ];
  const chipAmt = [100, 200, 500];
  const RED_NUM = [
    2, 3, 5, 7, 10, 11, 12, 14, 16, 17, 21, 23, 25, 28, 30, 31, 33, 35,
  ];
  const navigation = useNavigate();
  const [totalCasinoAmt, settotalCasinoAmt] = useState(100000);
  const [spinResult, setSpinResult] = useState(null);
  const [selectedBet, setSelectedBet] = useState("");
  const [singlebet, setSinglebet] = useState(null);
  const [UserChipAmt, SetUserChipAmt] = useState(null);
  const [allbet, setAllBet] = useState([]);
  const [players, setPlayers] = useState(() =>
    Array.from({ length: playerno }, (_, i) => ({
      id: i + 1,
      userBalance: Math.floor(Math.random() * 7000) + 1000,
      hasbetted: false,
    })),
  );
  for (let i = 1; i <= 36; i++) {
    wheelNumbers.push(i);
  }
  const [activePlayer, setActivePlayer] = useState(players[0]);

  const SelectBetType = (e) => {
    if (e.target.value !== "single Bet") {
      setSinglebet(null);
    }
    setSelectedBet(e.target.value);
    addMultipleBet(e.target.value, UserChipAmt);
    console.log(e.target.value);
  };

  const clrVal = () => {
    setSpinResult(null);
    setAllBet([]);
    setSinglebet(null);
    SetUserChipAmt(null);
    setSelectedBet("");
    setActivePlayer(players[0]);
  };

  const addMultipleBet = (bet, chip, singleValue = null) => {
    if (totalCasinoAmt < chip) {
      alert("You don't have sufficient balance");
      return;
    }
    let res;
    const existBet = allbet.find((abet) => {
      if (
        abet.userId === activePlayer.id &&
        abet.betType === bet &&
        abet.singlebetVal === singleValue
      ) {
        return abet;
      } else if (abet.userId === activePlayer.id && abet.betType === bet) {
        return abet;
      }
    });

    if (existBet && chip !== null) {
      setAllBet((allprev) =>
        allprev.map((abet) =>
          abet === existBet
            ? {
                ...abet,
                totalchip: abet.totalchip + chip,
                betCount: abet.betCount + 1,
              }
            : abet,
        ),
      );
    } else {
      if (bet === "single Bet" && singleValue !== null && chip !== null) {
        res = {
          betType: bet,
          chipAmt: chip,
          totalchip: chip,
          singlebetVal: singleValue,
          userId: activePlayer.id,
          betCount: 1,
        };
        setSinglebet(null);
      } else if (bet !== "" && chip !== null) {
        res = {
          betType: bet,
          chipAmt: chip,
          totalchip: chip,
          userId: activePlayer.id,
          betCount: 1,
        };
      } else {
        return;
      }
      setAllBet((allprev) => [...allprev, res]);
      setSelectedBet("");
      SetUserChipAmt(null);
    }
    setActivePlayer((aplayer) => ({ ...aplayer, hasbetted: true }));
  };

  const chkspin = () => {
    const allbetUserId = players.every((p) =>
      allbet.some((abet) => abet.userId === p.id),
    );
    return allbetUserId;
  };

  const addcasinomoney = () => {
    if (window.confirm("You sure want to add 1000 ?")) {
      settotalCasinoAmt((t) => t + 1000);
    }
    return;
  };

  const TooltipMsg = (bet) => {
    let msg = "";
    if (!UserChipAmt) {
      msg = "Select Chip";
    } else if (bet === "1st 12" || bet === "2nd 12" || bet === "3rd 12") {
      msg = `Profilt : ${UserChipAmt * 3} , Loss : ${UserChipAmt}`;
    } else if (bet === "single Bet") {
      msg = `Profilt : ${UserChipAmt * 36} , Loss : ${UserChipAmt}`;
    } else {
      msg = `Profilt : ${UserChipAmt * 2} , Loss : ${UserChipAmt}`;
    }
    return msg;
  };

  const gotoNextPlayer = () => {
    setActivePlayer((prev) => {
      const nextPlayer = players.find((p) => p.id === prev.id + 1);
      return nextPlayer || prev;
    });
  };

  return (
    <>
      {playerno > 0 && (
        <div>
          <h1>European Roulette Casino : {totalCasinoAmt} ₹</h1>
          <p>Total Player : {playerno}</p>
          <div className="playergrid">
            {players.map((p) => (
              <button
                key={p.id}
                style={{
                  backgroundColor:
                    activePlayer.id === p.id ? "teal" : "#2b1e74c2",
                  textAlign: "left",
                }}
              >
                Player - {p.id}
                <br />
                Balance - {p.userBalance}
              </button>
            ))}
            <br />
            {activePlayer.id <= players.length - 1 && (
              <button
                onClick={gotoNextPlayer}
                disabled={!activePlayer.hasbetted}
              >
                {" "}
                Next Player ▶
              </button>
            )}
          </div>
          <section className="chipInfo">
            <div className="divChip">
              {chipAmt.map((chip, index) => (
                <button
                  className={
                    allbet.find((am) => am.chipAmt === chip) ||
                    UserChipAmt === chip
                      ? "selectedChipAmt"
                      : "chipbtn"
                  }
                  key={index}
                  onClick={(e) => {
                    SetUserChipAmt(Number(e.target.value));
                    addMultipleBet(
                      selectedBet,
                      Number(e.target.value),
                      singlebet,
                    );
                  }}
                  value={chip}
                >
                  {chip} ₹
                </button>
              ))}
              <br />
              <button className="add1kbtn" onClick={addcasinomoney}>
                + Add 1000 in casino
              </button>
            </div>
          </section>
          <hr />
          <section className="divbtn">
            <div className="btn0">
              <Tooltip direction="top" content={TooltipMsg("single Bet")}>
                <button
                  className={
                    allbet.find((am) => am.singlebetVal === 0) || singlebet == 0
                      ? "selectedBet"
                      : "Greenbtn"
                  }
                  style={{
                    height: "Stretch",
                    border: "none",
                  }}
                  onClick={() => {
                    setSelectedBet("single Bet");
                    setSinglebet(0);
                    addMultipleBet("single Bet", UserChipAmt, 0);
                  }}
                >
                  0{" "}
                </button>
              </Tooltip>
            </div>
            <div className="otherbtn">
              {wheelNumbers.map((wno, index) => (
                <Tooltip direction="top" content={TooltipMsg("single Bet")}>
                  <button
                    className={
                      allbet.find(
                        (am) => Number(am.singlebetVal) == Number(wno),
                      ) || singlebet == wno
                        ? "selectedBet"
                        : RED_NUM.includes(Number(wno))
                          ? "redbtn"
                          : "blackbtn"
                    }
                    key={index}
                    onClick={() => {
                      setSelectedBet("single Bet");
                      setSinglebet(wno);
                      addMultipleBet("single Bet", UserChipAmt, wno);
                    }}
                  >
                    {wno}
                  </button>
                </Tooltip>
              ))}
            </div>
          </section>
          <div className="betTypes">
            {Bet_type.map((bet_ty, index) => (
              <>
                <Tooltip direction="top" content={TooltipMsg(bet_ty)}>
                  <button
                    key={index}
                    value={bet_ty}
                    onClick={SelectBetType}
                    className={
                      allbet.find((am) => am.betType == bet_ty) ||
                      selectedBet === bet_ty
                        ? "selectedBet"
                        : ""
                    }
                  >
                    {bet_ty}
                  </button>
                </Tooltip>
              </>
            ))}
          </div>
          {!spinResult && (
            <div className="chipData">
              {allbet.map((abet, index) => (
                <div key={index}>
                  {abet.userId && <p>Player {abet.userId}</p>}
                  {abet.betType && (
                    <p>
                      Bet Type : {abet.betType}{" "}
                      {abet.betCount > 1 && <>X {abet.betCount}</>}{" "}
                    </p>
                  )}
                  {abet.betType === "single Bet" &&
                    abet.singlebetVal !== null && (
                      <p>Single Bet on : {abet.singlebetVal}</p>
                    )}
                  {abet.totalchip && <p>betted amount : {abet.totalchip} ₹</p>}
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() =>
              WheelSpin(
                allbet,
                RED_NUM,
                setSpinResult,
                setAllBet,
                settotalCasinoAmt,
                setPlayers,
              )
            }
            className="spinbtn"
            disabled={!chkspin()}
          >
            Spin
          </button>

          <button onClick={clrVal} id="clrbtn">
            Clear
          </button>
          <button
            onClick={() => {
              (navigation("/"), localStorage.setItem("players", 0));
            }}
            id="clrbtn"
          >
            Exit
          </button>
          <br />
          <div className={spinResult ? "resultDiv" : "NoresultDiv"}>
            {spinResult !== null && <p className="spinNo"> {spinResult}</p>}
          </div>
          <section className="allbetdiv">
            {spinResult &&
              allbet.map((abet, index) => (
                <p key={index}>
                  <span>
                    {abet.betType} - Player {abet.userId} {abet.status}{" "}
                    {abet.amt}
                  </span>
                  <br />
                  <small>
                    Player {abet.userId} betted {abet.totalchip}
                  </small>
                </p>
              ))}
            <small>
              The amount displaying after spin is the amount of bet + your win
              amount
            </small>
          </section>
        </div>
      )}
    </>
  );
}

export default Casino;
