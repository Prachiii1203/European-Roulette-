import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";
import WheelSpin from "./WheelSpin";
import addMultipleBet from "./addMultipleBet";
import SpinResult from "./SpinResult";

function Casino({ playerno }) {
  const wheelNumbers = [];
  const Bet_type = ["Red", "Odd", "1st 12", "2nd 12", "3rd 12", "1-18/Lower", "19-36/Higer", "Even", "Black"];
  const chipAmt = [100, 200, 500];
  const RED_NUM = [2, 3, 5, 7, 10, 11, 12, 14, 16, 17, 21, 23, 25, 28, 30, 31, 33, 35];
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
    addMultipleBet(
      totalCasinoAmt,
      players,
      setPlayers,
      activePlayer,
      setActivePlayer,
      allbet,
      setAllBet,
      setSinglebet,
      setSelectedBet,
      SetUserChipAmt,
      e.target.value,
      UserChipAmt,
    );
  };

  const clrVal = () => {
    setSpinResult(null);
    setAllBet([]);
    setSinglebet(null);
    SetUserChipAmt(null);
    setSelectedBet("");
    setActivePlayer(players[0]);
  };

  const chkspin = () => {
    const allbetUserId = players.every((p) => allbet.some((abet) => abet.userId === p.id));
    return allbetUserId;
  };

  const addcasinomoney = () => {
    if (window.confirm("You sure want to add 1000 ?")) {
      settotalCasinoAmt((t) => t + 1000);
    }
    return;
  };

  const TooltipMsg = (btnval, no = null) => {
    let msg = "";
    let chkuser;

    if (btnval === "spin") {
      if (allbet.length > 0) {
        allbet.map((abet) => (msg += `Player ${abet.userId} has betted on ${abet.betType} X ${abet.betCount} `));
      } else {
        msg = "All Player Have to bet atleast once";
      }
    } else {
      if (no !== null) {
        chkuser = allbet.filter((fuser) => {
          if (fuser.betType === "single Bet" && fuser.singlebetVal === no) {
            return true;
          } else if (fuser.betType === "1st 12" && fuser.betRange.includes(no)) {
            return true;
          } else if (fuser.betType === "2nd 12" && fuser.betRange.includes(no)) {
            return true;
          } else if (fuser.betType === "3rd 12" && fuser.betRange.includes(no)) {
            return true;
          } else if (fuser.betType === "1-18/Lower" && fuser.betRange.includes(no)) {
            return true;
          } else if (fuser.betType === "19-36/Higer" && fuser.betRange.includes(no)) {
            return true;
          } else if (fuser.betType === "Odd" && fuser.betRange.includes(no)) {
            return true;
          } else if (fuser.betType === "Even" && fuser.betRange.includes(no)) {
            return true;
          }
          return false;
        });
      } else {
        chkuser = allbet.filter((fuser) => fuser.betType === btnval);
      }

      if (chkuser.length === 0) {
        msg = "No one has selected this Bet";
        return msg;
      }

      chkuser.map((cu) => {
        msg += `Player ${cu.userId} has betted ${cu.betType} X ${cu.betCount} `;
      });
    }

    return msg;
  };

  const gotoNextPlayer = () => {
    setActivePlayer((prev) => {
      const nextPlayer = players.find((p) => p.id === prev.id + 1);
      return nextPlayer || prev;
    });
    console.log(allbet);
  };
  const gotoPrevPlayer = () => {
    setActivePlayer((prev) => {
      const prevPlayer = players.find((p) => p.id === prev.id - 1);
      return prevPlayer || prev;
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
                className="showPlayer"
                style={{
                  backgroundColor: activePlayer.id === p.id ? "teal" : "#2b1e74c2",
                  textAlign: "left",
                  border: "none",
                }}
              >
                Player - {p.id}
                <br />
                Balance - {p.userBalance}
              </button>
            ))}
            <br />
            {!spinResult && (
              <>
                {activePlayer.id !== 1 && <button onClick={gotoPrevPlayer}> ◀ Previous Player</button>}
                {activePlayer.id <= players.length - 1 && <button onClick={gotoNextPlayer}> Next Player ▶</button>}
              </>
            )}
          </div>
          <section className="chipInfo">
            <div className="divChip">
              {chipAmt.map((chip, index) => (
                <button
                  className={allbet.find((am) => am.chipAmt === chip && am.userId === activePlayer.id) || UserChipAmt === chip ? "selectedChipAmt" : "chipbtn"}
                  key={index}
                  onClick={(e) => {
                    SetUserChipAmt(Number(e.target.value));
                    addMultipleBet(
                      totalCasinoAmt,
                      players,
                      setPlayers,
                      activePlayer,
                      setActivePlayer,
                      allbet,
                      setAllBet,
                      setSinglebet,
                      setSelectedBet,
                      SetUserChipAmt,
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
              <Tooltip direction="top" content={TooltipMsg("single Bet", 0)}>
                <button
                  className={allbet.find((am) => am.singlebetVal === 0 && am.userId === activePlayer.id) || singlebet == 0 ? "selectedBet" : "Greenbtn"}
                  style={{
                    height: "Stretch",
                    border: "none",
                  }}
                  onClick={() => {
                    setSelectedBet("single Bet");
                    setSinglebet(0);
                    addMultipleBet(
                      totalCasinoAmt,
                      players,
                      setPlayers,
                      activePlayer,
                      setActivePlayer,
                      allbet,
                      setAllBet,
                      setSinglebet,
                      setSelectedBet,
                      SetUserChipAmt,
                      "single Bet",
                      UserChipAmt,
                      0,
                    );
                  }}
                >
                  0{" "}
                </button>
              </Tooltip>
            </div>
            <div className="otherbtn">
              {wheelNumbers.map((wno, index) => (
                <Tooltip direction="top" content={TooltipMsg("single Bet", wno)}>
                  <button
                    className={
                      allbet.find((am) => (Number(am.singlebetVal) == Number(wno) || am.betRange.includes(wno)) && am.userId === activePlayer.id) ||
                      singlebet == wno
                        ? "selectedBet"
                        : RED_NUM.includes(Number(wno))
                          ? "redbtn"
                          : "blackbtn"
                    }
                    key={index}
                    onClick={() => {
                      setSelectedBet("single Bet");
                      setSinglebet(wno);
                      addMultipleBet(
                        totalCasinoAmt,
                        players,
                        setPlayers,
                        activePlayer,
                        setActivePlayer,
                        allbet,
                        setAllBet,
                        setSinglebet,
                        setSelectedBet,
                        SetUserChipAmt,
                        "single Bet",
                        UserChipAmt,
                        wno,
                      );
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
                    className={allbet.find((am) => am.betType == bet_ty && am.userId === activePlayer.id) || selectedBet === bet_ty ? "selectedBet" : ""}
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
                      Bet Type : {abet.betType} {abet.betCount > 1 && <>X {abet.betCount}</>}{" "}
                    </p>
                  )}
                  {abet.betType === "single Bet" && abet.singlebetVal !== null && <p>Single Bet on : {abet.singlebetVal}</p>}
                  {abet.totalchip && <p>betted amount : {abet.totalchip} ₹</p>}
                </div>
              ))}
            </div>
          )}
          <Tooltip direction="top" content={TooltipMsg("spin")}>
            <button
              onClick={() => WheelSpin(allbet, RED_NUM, setSpinResult, setAllBet, settotalCasinoAmt, setPlayers)}
              className="spinbtn"
              disabled={!chkspin() || spinResult}
            >
              Spin
            </button>
          </Tooltip>
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
          <div className={spinResult ? "resultDiv" : "NoresultDiv"}>{spinResult !== null && <p className="spinNo"> {spinResult}</p>}</div>
          {spinResult && (
            <section className="allbetdiv">
              <SpinResult allbet={allbet} />
              <small>The amount displaying after spin is the amount of bet + your win amount</small>
            </section>
          )}
        </div>
      )}
    </>
  );
}

export default Casino;
