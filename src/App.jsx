import { useState } from "react";

function App() {
  const [totalAmt, setTotalAmt] = useState(1000);
  const wheelNumbers = [];
  const Bet_type = [
    "Red",
    "Black",
    "Odd",
    "Even",
    "1st 12",
    "2nd 12",
    "3rd 12",
    "1-18/Lower",
    "19-36/Higer",
  ];
  const chipAmt = [100, 200, 500];
  const [spinResult, setSpinResult] = useState(null);
  const [selectedBet, setSelectedBet] = useState("");
  const [msg, setMsg] = useState("");
  const [singlebet, setSinglebet] = useState(null);
  const [UserChipAmt, SetUserChipAmt] = useState(null);
  const RED_NUM = [
    2, 3, 5, 7, 10, 11, 12, 14, 16, 17, 21, 23, 25, 28, 30, 31, 33, 35,
  ];

  for (let i = 1; i <= 36; i++) {
    wheelNumbers.push(i);
  }

  const WheelResult = () => {
    if (UserChipAmt === null) {
      return alert("Please Select The Amount To Bet");
    }

    if (selectedBet === "") {
      return alert("Please Select Bet Type");
    }
    if (totalAmt < UserChipAmt) {
      return alert("You don't have sufficient balance");
    }
    let val = Math.floor(Math.random() * wheelNumbers.length + 1);
    setSpinResult(val);

    switch (selectedBet) {
      case "Red":
        countBetAmt(RED_NUM.includes(val));
        break;
      case "Black":
        countBetAmt(!RED_NUM.includes(val) && val !== 0);
        break;
      case "Odd":
        countBetAmt(val !== 0 && val % 2 !== 0);
        break;
      case "Even":
        countBetAmt(val !== 0 && val % 2 === 0);
        break;
      case "1st 12":
        countBetAmt(val > 0 && val <= 12, 3);
        break;
      case "2nd 12":
        countBetAmt(val > 12 && val <= 24, 3);
        break;
      case "3rd 12":
        countBetAmt(val > 24 && val <= 36, 3);
        break;
      case "1-18/Lower":
        countBetAmt(val > 0 && val <= 18);
        break;
      case "19-36/Higer":
        countBetAmt(val > 18 && val <= 36);
        break;
      case "single Bet":
        countBetAmt(singlebet === Number(val), 35);
        // setSinglebet(null);
        break;
      default:
        // console.log("There is not such kind of Bet here");
        return;
    }
  };

  const countBetAmt = (resultcondition, n = 2) => {
    const resultMsg = resultcondition ? "Win" : "Loss";
    setMsg(resultMsg);

    if (resultMsg === "Win") {
      const winprice = n * UserChipAmt;
      setTotalAmt((tot) => tot + winprice - UserChipAmt);
    } else {
      setTotalAmt((tot) => tot - UserChipAmt);
    }
  };

  const SelectBetType = (e) => {
    setSelectedBet(e.target.value);
    console.log(e.target.value);
  };

  const clrVal = () => {
    setSpinResult(null);
    setMsg("");
    setSelectedBet("");
    setSinglebet(null);
    SetUserChipAmt(null);
  };

  return (
    <>
      <div>
        <h1>European Roulette Casino</h1>
        <div>
          <h3>Total Chip Balance : {totalAmt} ₹</h3>
        </div>
        <div className="chipInfo">
          <div className="divChip">
            {chipAmt.map((chip, index) => (
              <button
                key={index}
                onClick={(e) => {
                  SetUserChipAmt(Number(e.target.value));
                }}
                value={chip}
              >
                {chip} ₹
              </button>
            ))}
            <br />
            <button
              onClick={() => {
                if (window.confirm("You sure want to add 1000 ?")) {
                  setTotalAmt((t) => t + 1000);
                }
                return;
              }}
            >
              + Add more 1000 chip in balance
            </button>
          </div>
          <div className="chipData">
            {selectedBet && <p>Bet Type : {selectedBet} </p>}
            {selectedBet === "single Bet" && singlebet !== null && (
              <p>Single Bet on : {singlebet}</p>
            )}
            {UserChipAmt && <p>Chip : {UserChipAmt} ₹</p>}
          </div>
        </div>
        <hr />
        <div className="divbtn">
          <div className="btn0">
            <button
              className="Greenbtn"
              onClick={() => {
                setSelectedBet("single Bet");
                setSinglebet(0);
              }}
            >
              0{" "}
            </button>
          </div>
          <div className="otherbtn">
            {wheelNumbers.map((wno, index) => (
              <button
                className={
                  RED_NUM.includes(Number(wno)) ? "redbtn" : "blackbtn"
                }
                key={index}
                onClick={() => {
                  setSelectedBet("single Bet");
                  setSinglebet(wno);
                }}
              >
                {wno}
              </button>
            ))}
          </div>
        </div>
        <div className="betTypes">
          {Bet_type.map((bet_ty, index) => (
            <button key={index} value={bet_ty} onClick={SelectBetType}>
              {bet_ty}
            </button>
          ))}
        </div>
        <button
          onClick={WheelResult}
          className="spinbtn"
          disabled={!selectedBet || !UserChipAmt}
        >
          Spin
        </button>
        <button onClick={clrVal}>Clear</button>
        <br />

        <div className={spinResult ? "resultDiv" : "NoresultDiv"}>
          {spinResult !== null && <p className="spinNo"> {spinResult}</p>}
          {msg && (
            <p className={msg === "Loss" ? "spinlossStatus" : "spinWinStatus"}>
              {msg}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
