import { useState } from "react";

function App() {
  const [totalAmt, setTotalAmt] = useState(1000);
  const wheelNumbers = [];
  const Bet_type = [
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

  for (let i = 0; i <= 36; i++) {
    wheelNumbers.push(i);
  }

  const WheelResult = () => {
    if (UserChipAmt === null) {
      return alert("Please Select The Amount of Bet");
    }

    if (selectedBet === "") {
      return alert("Please Select Bet Type First");
    }
    let val = Math.floor(Math.random() * wheelNumbers.length);
    setSpinResult(val);

    switch (selectedBet) {
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
      case "single Value":
        countBetAmt(singlebet === Number(val), 35);
        setSinglebet(null);
        break;
      default:
        // console.log("There is not such kind of Bet here");
        return;
    }
  };

  const countBetAmt = (resultcondition, n = 2) => {
    if (totalAmt < UserChipAmt) {
      return alert("You don't have sufficient balance");
    }

    const resultMsg = resultcondition ? "Win" : "Loss";
    setMsg(resultMsg);

    if (resultMsg === "Win") {
      const winprice = n * UserChipAmt;
      setTotalAmt((tot) => tot + winprice);
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

        <h3>Total Balance : {totalAmt} ₹</h3>
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
        </div>
        <hr />
        <div className="divbtn">
          {wheelNumbers.map((wno, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedBet("single Value");
                setSinglebet(wno);
              }}
            >
              {wno}
            </button>
          ))}
        </div>
        <div className="betTypes">
          {Bet_type.map((bet_ty, index) => (
            <button key={index} value={bet_ty} onClick={SelectBetType}>
              {bet_ty}
            </button>
          ))}
        </div>
        <button onClick={WheelResult} className="spinbtn">
          Spin
        </button>
        <button onClick={clrVal}>Clear</button>
        <br />
        {selectedBet && (
          <p>
            Bet on {selectedBet} {UserChipAmt && <>of {UserChipAmt} ₹</>}{" "}
          </p>
        )}
        {selectedBet === "single Value" && singlebet !== null && (
          <p>Single Bet value : {singlebet}</p>
        )}
        {spinResult !== null && <p>Result : {spinResult}</p>}
        {msg && <p className="spinresStatus">{msg}</p>}
      </div>
    </>
  );
}

export default App;
