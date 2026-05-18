import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";
import WheelSpin from "./WheelSpin";
import addMultipleBet, { TooltipMsg } from "./addMultipleBet";
import SpinResult from "./SpinResult";
import TooltipData from "./TooltipData";

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
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [roundHistory, setRoundHistory] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);

  const [selectedHistoryRound, setSelectedHistoryRound] = useState(null);
  const previewBets = selectedHistoryRound ? selectedHistoryRound.allBets : allbet;
  const SelectBetType = (e) => {
    if (e.target.value !== "single Bet") {
      setSinglebet(null);
    }
    setSelectedBet(e.target.value);
  };

  const clrVal = () => {
    if (!spinResult) {
      const fixBankBalance = players.map((preplayer) => {
        let addAmt = 0;
        allbet.map((adduserbalance) => {
          if (preplayer.id === adduserbalance.userId) {
            addAmt += adduserbalance.totalchip;
          }
          return addAmt;
        });
        return {
          ...preplayer,
          userBalance: preplayer.userBalance + addAmt,
        };
      });
      setPlayers(fixBankBalance);
      setIsPreviewMode(false);
    } else {
      setSpinResult(null);
      setCurrentRound((curr) => curr + 1);
    }
    setActivePlayer(players[0]);
    SetUserChipAmt(null);
    setSelectedBet("");
    setAllBet([]);
    setSinglebet(null);
  };

  const chkspin = () => {
    const allbetUserId = players.every((p) => allbet.some((abet) => abet.userId === p.id));
    return allbetUserId;
  };

  const addCasinoMoney = () => {
    if (window.confirm("You sure want to add 1000 ?")) {
      settotalCasinoAmt((t) => t + 1000);
    }
    return;
  };

  const gotoNextPlayer = () => {
    setActivePlayer((prev) => {
      const nextPlayer = players.find((p) => p.id === prev.id + 1);
      return nextPlayer || prev;
    });
  };

  const gotoPrevPlayer = () => {
    setActivePlayer((prev) => {
      const prevPlayer = players.find((p) => p.id === prev.id - 1);
      return prevPlayer || prev;
    });
  };

  const removeChipBet = (chip, selectedBet, singlebet) => {
    const updatedBet = allbet.map((bet) => {
      if (bet.userId === activePlayer.id && bet.betType === selectedBet && (selectedBet !== "single Bet" || bet.singlebetVal === singlebet)) {
        const chipExist = bet.allChip.includes(chip);

        if (chipExist) {
          const duplicateChip = [...bet.allChip];
          const removeChipIndex = duplicateChip.lastIndexOf(chip);
          duplicateChip.splice(removeChipIndex, 1);

          return {
            ...bet,
            allChip: duplicateChip,
            totalchip: bet.totalchip - chip,
            betCount: bet.betCount - 1,
          };
        }
      }

      return bet;
    });

    const removeEmptyBet = updatedBet.filter((bet) => {
      return bet.totalchip > 0;
    });

    setAllBet(removeEmptyBet);

    const fixBankBalance = players.map((player) =>
      player.id === activePlayer.id
        ? {
            ...player,
            userBalance: player.userBalance + chip,
          }
        : player,
    );
    setPlayers(fixBankBalance);
  };

  const betPreviewbtn = () => {
    if (allbet.length === 0) return alert("Place atleast one bet");

    setIsPreviewMode(true);
    setActivePlayer("");
  };

  const spinWheelbtn = () => {
    const result = WheelSpin(allbet, RED_NUM, setSpinResult, setAllBet, settotalCasinoAmt, setPlayers);

    const roundData = {
      roundNo: currentRound,
      allBets: [...allbet],
      spinValue: result,
    };

    setRoundHistory((prev) => [...prev, roundData]);
    setIsPreviewMode(false);
  };

  const goToNextRound = () => {
    clrVal();
    setSpinResult(null);
    setIsPreviewMode(false);
    setSelectedHistoryRound(null);
    setActivePlayer(players[0]);
  };

  return (
    <>
      {playerno > 0 && (
        <div>
          <section className="chipInfo">
            <h1>European Roulette Casino : {totalCasinoAmt} ₹</h1>
            <div className="divChip">
              <button className="add1kbtn" onClick={addCasinoMoney}>
                + Add 1000 in casino
              </button>
            </div>
          </section>
          <h2>Round : {currentRound}</h2>
          <p>Total Player : {playerno}</p>
          <div className="playergrid">
            {players.map((p) => (
              <button
                key={p.id}
                className="showPlayer"
                style={{
                  backgroundColor: activePlayer.id === p.id ? "teal" : "#260042d9",
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
          </div>
          <div className={spinResult || isPreviewMode ? "preNextbtnHide" : "preNextbtn"}>
            {activePlayer.id !== 1 && (
              <button id="clrbtn" onClick={gotoPrevPlayer}>
                {" "}
                ◀ Previous Player
              </button>
            )}
            {activePlayer.id <= players.length - 1 && (
              <button id="clrbtn" onClick={gotoNextPlayer}>
                {" "}
                Next Player ▶
              </button>
            )}
          </div>
          <hr />
          <section className="divbtn">
            <div className="btn0">
              <Tooltip
                direction="top"
                content={
                  <>
                    <TooltipData chipAmt={chipAmt} addMultipleBet={addMultipleBet} removeChipBet={removeChipBet} totalCasinoAmt={totalCasinoAmt} players={players} setPlayers={setPlayers} activePlayer={activePlayer} setActivePlayer={setActivePlayer} allbet={previewBets} setAllBet={setAllBet} setSinglebet={setSinglebet} setSelectedBet={setSelectedBet} SetUserChipAmt={SetUserChipAmt} selectedBet={"single Bet"} singlebet={0} isPreviewMode={isPreviewMode || selectedHistoryRound} />
                    <p>{TooltipMsg(previewBets, RED_NUM, "single Bet", 0)}</p>
                  </>
                }
              >
                <button
                  className={isPreviewMode || selectedHistoryRound ? (previewBets.find((am) => am.singlebetVal === 0) ? "selectedsingleBet" : "Greenbtn") : previewBets.find((am) => am.singlebetVal === 0 && am.userId === activePlayer.id) ? "selectedsingleBet" : "Greenbtn"}
                  style={{
                    height: "Stretch",
                    border: "none",
                  }}
                  onClick={() => {
                    setSelectedBet("single Bet");
                    setSinglebet(0);
                  }}
                  disabled={isPreviewMode || selectedHistoryRound}
                >
                  0{" "}
                </button>
              </Tooltip>
            </div>
            <div className="otherbtn">
              {wheelNumbers.map((wno, index) => (
                <Tooltip
                  direction="top"
                  content={
                    <>
                      <>
                        <TooltipData chipAmt={chipAmt} addMultipleBet={addMultipleBet} removeChipBet={removeChipBet} totalCasinoAmt={totalCasinoAmt} players={players} setPlayers={setPlayers} activePlayer={activePlayer} setActivePlayer={setActivePlayer} allbet={previewBets} setAllBet={setAllBet} setSinglebet={setSinglebet} setSelectedBet={setSelectedBet} SetUserChipAmt={SetUserChipAmt} selectedBet="single Bet" singlebet={wno} isPreviewMode={isPreviewMode || selectedHistoryRound} />
                        <p>{TooltipMsg(previewBets, RED_NUM, "single Bet", wno)}</p>
                      </>
                    </>
                  }
                >
                  <button
                    className={
                      isPreviewMode || selectedHistoryRound
                        ? previewBets.find((am) => {
                            if (am.betType === "single Bet" && am.singlebetVal === wno) {
                              return true;
                            }
                            return am.betRange?.includes(wno);
                          })
                          ? "selectedsingleBet"
                          : RED_NUM.includes(wno)
                            ? "redbtn"
                            : "blackbtn"
                        : previewBets.find((am) => (am.singlebetVal === wno || am.betRange.includes(wno)) && am.userId === activePlayer.id)
                          ? "selectedsingleBet"
                          : RED_NUM.includes(wno)
                            ? "redbtn"
                            : "blackbtn"
                    }
                    key={index}
                    onClick={() => {
                      setSelectedBet("single Bet");
                      setSinglebet(wno);
                    }}
                    disabled={isPreviewMode || selectedHistoryRound}
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
                <Tooltip
                  direction="top"
                  content={
                    <>
                      <TooltipData chipAmt={chipAmt} addMultipleBet={addMultipleBet} removeChipBet={removeChipBet} totalCasinoAmt={totalCasinoAmt} players={players} setPlayers={setPlayers} activePlayer={activePlayer} setActivePlayer={setActivePlayer} allbet={previewBets} setAllBet={setAllBet} setSinglebet={setSinglebet} setSelectedBet={setSelectedBet} SetUserChipAmt={SetUserChipAmt} selectedBet={bet_ty} singlebet={null} isPreviewMode={isPreviewMode || selectedHistoryRound} />
                      <p>{TooltipMsg(previewBets, RED_NUM, bet_ty)}</p>
                    </>
                  }
                >
                  <button key={index} value={bet_ty} onClick={SelectBetType} className={isPreviewMode || selectedHistoryRound ? (previewBets.find((am) => am.betType === bet_ty) ? "selectedBet" : "betBtn") : previewBets.find((am) => am.betType === bet_ty && am.userId === activePlayer.id) ? "selectedBet" : "betBtn"} disabled={isPreviewMode || selectedHistoryRound}>
                    {bet_ty}
                  </button>
                </Tooltip>
              </>
            ))}
          </div>
          {!spinResult && !selectedHistoryRound && (
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
          {!spinResult ? (
            <Tooltip direction="top" content={TooltipMsg(previewBets, RED_NUM, "spin")}>
              <button className="spinbtn" disabled={!chkspin() || selectedHistoryRound} onClick={() => (!isPreviewMode ? betPreviewbtn() : spinWheelbtn())}>
                {!isPreviewMode ? "Preview Bets" : "Spin"}
              </button>
            </Tooltip>
          ) : (
            <button className="spinbtn" onClick={goToNextRound}>
              Next Round
            </button>
          )}
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
          <div className={spinResult ? "resultDiv" : "NoresultDiv"}>
            <p className="spinNo"> {spinResult}</p>
            <SpinResult allbet={allbet} />
            <small>The amount displaying after spin is the amount of bet + your win amount</small>
          </div>
        </div>
      )}
      <section className="roundHistory">
        <h2>Game History</h2>
        <div className="historyBtns">
          <button id="clrbtn" onClick={() => setSelectedHistoryRound(null)}>
            Current Round
          </button>
          {roundHistory.map((round) => (
            <button key={round.roundNo} id="clrbtn" onClick={() => setSelectedHistoryRound(round)}>
              Round {round.roundNo}
            </button>
          ))}
        </div>
        {selectedHistoryRound && (
          <div className="historyPreview">
            <h3>Preview of Round {selectedHistoryRound.roundNo}</h3>
            <h4> {selectedHistoryRound.spinValue && <>Spin Result : {selectedHistoryRound.spinValue} </>}</h4>
            <div>
              {selectedHistoryRound.allBets.map((bet, index) => (
                <div key={index}>
                  <p>Player {bet.userId}</p>
                  <p>Total : {bet.totalchip} ₹</p>
                  <p>Bet : {bet.betType}</p>
                  {bet.singlebetVal != null && <p>Number : {bet.singlebetVal}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Casino;
