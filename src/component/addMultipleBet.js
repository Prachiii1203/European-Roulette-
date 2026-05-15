const addMultipleBet = (
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
  bet,
  chip,
  singleValue = null,
) => {
  if (totalCasinoAmt < chip) {
    alert("You don't have sufficient balance");
    return;
  }

  const findUser = players.find((pbal) => {
    if (pbal.id === activePlayer.id) {
      return pbal;
    }
  });

  if (findUser.userBalance < chip) {
    alert("There is No sufficient amount");
    return;
  }

  let betnos = [];

  switch (bet) {
    case "Odd":
      betnos = loopOtherbet(1, 36, "Odd");
      break;
    case "Even":
      betnos = loopOtherbet(2, 36, "Even");
      break;
    case "1st 12":
      betnos = loopOtherbet(1, 12);
      break;
    case "2nd 12":
      betnos = loopOtherbet(13, 24);
      break;
    case "3rd 12":
      betnos = loopOtherbet(25, 36);
      break;
    case "1-18/Lower":
      betnos = loopOtherbet(1, 18);
      break;
    case "19-36/Higer":
      betnos = loopOtherbet(19, 36);
      break;
    default:
      betnos = [];
      break;
  }

  let res;
  const existBet = allbet.find((abet) => {
    if (abet.userId === activePlayer.id && abet.betType === bet && abet.singlebetVal === singleValue) {
      return abet;
    } else if (abet.userId === activePlayer.id && abet.betType === bet && singleValue === null) {
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
              allChip: [...abet.allChip, chip],
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
        betRange: betnos,
        allChip: [chip],
      };
      setSinglebet(null);
    } else if (bet !== "" && chip !== null) {
      res = {
        betType: bet,
        chipAmt: chip,
        totalchip: chip,
        userId: activePlayer.id,
        betCount: 1,
        betRange: betnos,
        allChip: [chip],
      };
    } else {
      return;
    }
    setAllBet((allprev) => [...allprev, res]);
    setSelectedBet("");
    SetUserChipAmt(null);
  }
  console.log(allbet);

  setPlayers((prev) =>
    prev.map((prePlayer) => {
      return prePlayer.id === activePlayer.id
        ? {
            ...prePlayer,
            userBalance: prePlayer.userBalance - chip,
          }
        : prePlayer;
    }),
  );
};

const loopOtherbet = (start, end, bet = null) => {
  let arr = [];
  if (bet === "Odd" || bet === "Even") {
    for (let i = start; i <= end; i = i + 2) {
      arr.push(i);
    }
  } else if (bet === null) {
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
  }

  return arr;
};

export default addMultipleBet;
