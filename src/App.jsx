import { useState } from "react";
import "./App.css";

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

  const [UserChipAmt, SetUserChipAmt] = useState(null);

  for (let i = 0; i <= 36; i++) {
    wheelNumbers.push(i);
  }

  const WheelResult = () => {
    if (selectedBet === "") {
      return alert("please select bet type first");
    }

    if (UserChipAmt === null) {
      return alert("Please Select the Amount of bet");
    }

    let val = Math.floor(Math.random() * wheelNumbers.length);
    setSpinResult(val);

    switch (selectedBet) {
      case "Odd":
        setMsg(val % 2 !== 0 ? "Win" : "Loss");
        countBetAmt();
        break;
      case "Even":
        setMsg(val % 2 !== 0 ? "Loss" : "Win");
        countBetAmt();
        break;
      case "1st 12":
        setMsg(val > 0 && val <= 12 ? "Win" : "Loss");
        countBetAmt(3);
        break;
      case "2nd 12":
        setMsg(val > 12 && val <= 24 ? "Win" : "Loss");
        countBetAmt(3);
        break;
      case "3rd 12":
        setMsg(val > 24 && val <= 36 ? "Win" : "Loss");
        countBetAmt(3);
        break;
      case "1-18/Lower":
        setMsg(val > 0 && val <= 18 ? "Win" : "Loss");
        countBetAmt();
        break;
      case "19-36/Higer":
        setMsg(val > 18 && val <= 36 ? "Win" : "Loss");
        countBetAmt();
        break;
      default:
        console.log("CHALA JA ");
    }
  };

  const countBetAmt = (n = 2) => {
    if (totalAmt < UserChipAmt) {
      return alert("You don't have sufficient balance");
    }

    if (msg === "Win") {
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

  return (
    <>
      <div>
        <h1>European Roulette Casino</h1>

        <h3>Total Balance : {totalAmt} ₹</h3>
        <div className="divChip">
          {chipAmt.map((chip, index) => (
            <>
              <button
                key={index}
                onClick={(e) => {
                  SetUserChipAmt(e.target.value);
                  console.log(e.target.value);
                }}
                value={chip}
              >
                {chip} ₹
              </button>
            </>
          ))}
        </div>
        <hr />
        <div className="divbtn">
          {wheelNumbers.map((wno, index) => (
            <>
              <button key={index}>{wno}</button>
            </>
          ))}
        </div>
        <div className="betTypes">
          {Bet_type.map((bet_ty, index) => (
            <>
              <button key={index} value={bet_ty} onClick={SelectBetType}>
                {bet_ty}
              </button>
            </>
          ))}
        </div>
        <button onClick={WheelResult}>Spin that shiii</button>
        <button
          onClick={() => {
            setSpinResult(null);
            setMsg("");
            setSelectedBet("");
          }}
        >
          Clear
        </button>
        <br />
        <p>
          {selectedBet && (
            <>
              Bet on {selectedBet} {UserChipAmt && <>of {UserChipAmt} ₹</>}{" "}
            </>
          )}
        </p>
        {spinResult && <p>Result : {spinResult}</p>}
        {msg && <p className="spinresStatus">{msg}</p>}
      </div>
    </>
  );
}

export default App;
