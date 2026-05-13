const WheelSpin = (
  allbet,
  RED_NUM,
  setSpinResult,
  setAllBet,
  settotalCasinoAmt,
  setPlayers,
) => {
  let val = Math.floor(Math.random() * 37);

  setSpinResult(val);

  const updatedBet = allbet.map((betval) => {
    switch (betval.betType) {
      case "Red":
        return countBetAmt(
          RED_NUM.includes(val),
          betval,
          2,
          settotalCasinoAmt,
          setPlayers,
        );
      case "Black":
        return countBetAmt(
          !RED_NUM.includes(val) && val !== 0,
          betval,
          2,
          settotalCasinoAmt,
          setPlayers,
        );
      case "Odd":
        return countBetAmt(
          val !== 0 && val % 2 !== 0,
          betval,
          2,
          settotalCasinoAmt,
          setPlayers,
        );
      case "Even":
        return countBetAmt(
          val !== 0 && val % 2 === 0,
          betval,
          2,
          settotalCasinoAmt,
          setPlayers,
        );
      case "1st 12":
        return countBetAmt(
          val > 0 && val <= 12,
          betval,
          3,
          settotalCasinoAmt,
          setPlayers,
        );
      case "2nd 12":
        return countBetAmt(
          val > 12 && val <= 24,
          betval,
          3,
          settotalCasinoAmt,
          setPlayers,
        );
      case "3rd 12":
        return countBetAmt(
          val > 24 && val <= 36,
          betval,
          3,
          settotalCasinoAmt,
          setPlayers,
        );
      case "1-18/Lower":
        return countBetAmt(
          val > 0 && val <= 18,
          betval,
          2,
          settotalCasinoAmt,
          setPlayers,
        );
      case "19-36/Higer":
        return countBetAmt(
          val > 18 && val <= 36,
          betval,
          2,
          settotalCasinoAmt,
          setPlayers,
        );
      case "single Bet":
        return countBetAmt(
          betval.singlebetVal === Number(val),
          betval,
          36,
          settotalCasinoAmt,
          setPlayers,
        );
      default:
        return betval;
    }
  });

  setAllBet(updatedBet);
};

function countBetAmt(resultcondition, bet, n, settotalCasinoAmt, setPlayers) {
  const resultMsg = resultcondition ? "Win" : "Loss";
  let winprice = 0;
  if (resultMsg === "Win") {
    winprice = n * bet.totalchip;
    settotalCasinoAmt((tot) => tot - winprice);
    setPlayers((prePlayer) =>
      prePlayer.map((pre) => {
        if (pre.id === bet.userId) {
          return {
            ...pre,
            userBalance: pre.userBalance + winprice - bet.totalchip,
          };
        }
        return pre;
      }),
    );
  } else {
    settotalCasinoAmt((tot) => tot + bet.totalchip);
    setPlayers((prePlayer) =>
      prePlayer.map((pre) => {
        if (pre.id === bet.userId) {
          return {
            ...pre,
            userBalance: pre.userBalance - bet.totalchip,
          };
        }
        return pre;
      }),
    );
  }
  return {
    ...bet,
    amt: resultMsg === "Win" ? winprice : bet.totalchip,
    status: resultMsg,
  };
}

export default WheelSpin;
