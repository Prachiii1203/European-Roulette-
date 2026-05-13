// import { useState } from "react";

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

// function App() {
//   const wheelNumbers = [];
//   const Bet_type = [
//     "Red",
//     "Odd",
//     "1st 12",
//     "2nd 12",
//     "3rd 12",
//     "1-18/Lower",
//     "19-36/Higer",
//     "Even",
//     "Black",
//   ];
//   const chipAmt = [100, 200, 500];
//   const RED_NUM = [
//     2, 3, 5, 7, 10, 11, 12, 14, 16, 17, 21, 23, 25, 28, 30, 31, 33, 35,
//   ];
//   const [totalAmt, setTotalAmt] = useState(1000);
//   const [spinResult, setSpinResult] = useState(null);
//   const [selectedBet, setSelectedBet] = useState("");
//   const [msg, setMsg] = useState("");
//   const [singlebet, setSinglebet] = useState(null);
//   const [UserChipAmt, SetUserChipAmt] = useState(null);
//   const [allbet, setAllBet] = useState([]);
//   const [spinbalanceFlag, setSpinbalanceFlag] = useState(false);

//   //to create bet numbers
//   for (let i = 1; i <= 36; i++) {
//     wheelNumbers.push(i);
//   }

//   //on spin
//   const WheelResult = () => {
//     //counted total amount of betted chip
//     const totalchipval = allbet.reduce((tot, val) => val.chipAmt + tot, 0);

//     //checking condition if spin is done and balance is 0 so it don't spin again
//     //if user have balance then cut amount of chip from it and then use proceed further
//     if (
//       spinbalanceFlag === true &&
//       (totalAmt <= 0 || totalAmt < totalchipval)
//     ) {
//       alert("you don't have sufficient balance,Please Add balance");
//       return;
//     } else if (spinbalanceFlag === true) {
//       setTotalAmt((tot) => tot - totalchipval);
//       setSpinbalanceFlag(false);
//     }

//     //spin result for random number from 0 to 36
//     let val = Math.floor(Math.random() * 37);
//     setSpinResult(val);

//     //updatebet - to check bettype and return result accroding to it
//     //will check all the bets from allbet
//     const updatedBet = allbet.map((betval) => {
//       switch (betval.betType) {
//         case "Red":
//           return countBetAmt(RED_NUM.includes(val), betval);
//         case "Black":
//           return countBetAmt(!RED_NUM.includes(val) && val !== 0, betval);
//         case "Odd":
//           return countBetAmt(val !== 0 && val % 2 !== 0, betval);
//         case "Even":
//           return countBetAmt(val !== 0 && val % 2 === 0, betval);
//         case "1st 12":
//           return countBetAmt(val > 0 && val <= 12, betval, 3);
//         case "2nd 12":
//           return countBetAmt(val > 12 && val <= 24, betval, 3);
//         case "3rd 12":
//           return countBetAmt(val > 24 && val <= 36, betval, 3);
//         case "1-18/Lower":
//           return countBetAmt(val > 0 && val <= 18, betval);
//         case "19-36/Higer":
//           return countBetAmt(val > 18 && val <= 36, betval);
//         case "single Bet":
//           return countBetAmt(betval.singlebetVal === Number(val), betval, 36);
//         default:
//           alert("There is not such kind of Bet here");
//           return;
//       }
//     });
//     //setting the bet
//     setAllBet(updatedBet);
//     //to print msg of win if any one is win it is still win
//     const chkwin = updatedBet.find((betwin) => betwin.status === "Win");
//     setMsg(chkwin ? "Win" : "Loss");
//     setSpinbalanceFlag(true); //flag
//   };

//   //to calculate bet amount and set status
//   const countBetAmt = (resultcondition, bet, n = 2) => {
//     const resultMsg = resultcondition ? "Win" : "Loss";
//     let winprice;
//     if (resultMsg === "Win") {
//       winprice = n * bet.chipAmt;
//       setTotalAmt((tot) => tot + winprice);
//     }

//     return {
//       ...bet,
//       ["amt"]: resultMsg === "Win" ? winprice : bet.chipAmt,
//       ["status"]: resultMsg,
//     };
//   };

//   //to select bet type and set in selectedbet
//   const SelectBetType = (e) => {
//     setSelectedBet(e.target.value);
//     addMultipleBet(e.target.value, UserChipAmt);
//     setCssFlag(true);
//     console.log(e.target.value);
//   };

//   //to clear all bet and result
//   const clrVal = () => {
//     setSpinResult(null);
//     setMsg("");
//     setAllBet([]);
//     setSpinbalanceFlag(false);
//   };

//   //to create a object for multiple bet
//   const addMultipleBet = (bet, chip) => {
//     //check if the chip value is not greater than total balance
//     if (totalAmt < chip) {
//       alert("You don't have sufficient balance");
//       return;
//     }

//     //according to bet data is set in allbet array
//     let res;
//     if (bet === "single Bet" && singlebet !== null && chip !== null) {
//       res = { betType: bet, chipAmt: chip, singlebetVal: singlebet };
//       setSinglebet(null);
//     } else if (bet !== "" && chip !== null) {
//       res = { betType: bet, chipAmt: chip };
//     } else {
//       return;
//     }

//     //cut chip amount from total
//     setTotalAmt((tot) => tot - chip);
//     setAllBet((allprev) => [...allprev, res]);

//     setSelectedBet("");
//     SetUserChipAmt(null);
//   };

//   return (
//     <>
//       <div>
//         <h1>European Roulette Casino</h1>
//         <h3>Total Chip Balance : {totalAmt} ₹</h3>
//         <section className="chipInfo">
//           <div className="divChip">
//             {chipAmt.map((chip, index) => (
//               <button
//                 className={UserChipAmt === chip ? "selectedChipAmt" : "chipbtn"}
//                 key={index}
//                 onClick={(e) => {
//                   SetUserChipAmt(Number(e.target.value));
//                   addMultipleBet(selectedBet, Number(e.target.value));
//                 }}
//                 value={chip}
//               >
//                 {chip} ₹
//               </button>
//             ))}
//             <br />
//             <button
//               className="add1kbtn"
//               onClick={() => {
//                 if (window.confirm("You sure want to add 1000 ?")) {
//                   setTotalAmt((t) => t + 1000);
//                 }
//                 return;
//               }}
//             >
//               + Add 1000 chip in balance
//             </button>
//           </div>
//           <div className="chipData">
//             {allbet.map((abet, index) => (
//               <div key={index}>
//                 {abet.betType && <p>Bet Type : {abet.betType} </p>}
//                 {abet.betType === "single Bet" &&
//                   abet.singlebetVal !== null && (
//                     <p>Single Bet on : {abet.singlebetVal}</p>
//                   )}
//                 {abet.chipAmt && <p>Chip : {abet.chipAmt} ₹</p>}
//               </div>
//             ))}
//           </div>
//         </section>
//         <hr />
//         <section className="divbtn">
//           <div className="btn0">
//             <button
//               className="Greenbtn"
//               onClick={() => {
//                 setSelectedBet("single Bet");
//                 setSinglebet(0);
//                 addMultipleBet("single Bet", UserChipAmt);
//               }}
//             >
//               0{" "}
//             </button>
//           </div>
//           <div className="otherbtn">
//             {wheelNumbers.map((wno, index) => (
//               <button
//                 className={
//                   RED_NUM.includes(Number(wno)) ? "redbtn" : "blackbtn"
//                 }
//                 key={index}
//                 onClick={() => {
//                   setSelectedBet("single Bet");
//                   setSinglebet(wno);
//                   addMultipleBet("single Bet", UserChipAmt);
//                   setCssFlag(true);
//                 }}
//               >
//                 {wno}
//               </button>
//             ))}
//           </div>
//         </section>
//         <div className="betTypes">
//           {Bet_type.map((bet_ty, index) => (
//             <button
//               key={index}
//               value={bet_ty}
//               onClick={SelectBetType}
//               style={{
//                 backgroundColor: selectedBet === bet_ty && "pink",
//               }}
//             >
//               {bet_ty}
//             </button>
//           ))}
//         </div>
//         <button
//           onClick={WheelResult}
//           className="spinbtn"
//           disabled={allbet.length <= 0}
//         >
//           Spin
//         </button>
//         <button onClick={clrVal} id="clrbtn">
//           Clear
//         </button>
//         <br />

//         <div className={spinResult ? "resultDiv" : "NoresultDiv"}>
//           {spinResult !== null && <p className="spinNo"> {spinResult}</p>}
//           {msg && (
//             <p className={msg === "Loss" ? "spinlossStatus" : "spinWinStatus"}>
//               {msg}
//             </p>
//           )}
//         </div>
//         <section className="allbetdiv">
//           {spinResult &&
//             allbet.map((abet, index) => (
//               <p key={index}>
//                 <span>
//                   {abet.betType} - You {abet.status} {abet.amt}
//                 </span>
//                 <br />
//                 <small>You betted {abet.chipAmt}</small>
//               </p>
//             ))}
//         </section>
//       </div>
//     </>
//   );
// }

// export default App;
