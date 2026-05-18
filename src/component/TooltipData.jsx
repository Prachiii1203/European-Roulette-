const TooltipData = ({
  chipAmt,
  addMultipleBet,
  removeChipBet,
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
  singlebet,
  isPreviewMode,
}) => {

  const currBet = allbet?.find((cbet) => {
    if (selectedBet === "single Bet" && cbet.betType === "single Bet" && cbet.userId === activePlayer.id && cbet.singlebetVal === singlebet) {
      return true;
    } else if (selectedBet === cbet.betType && cbet.userId === activePlayer.id && cbet.betType !== "single Bet") {
      return true;
    }
    return false;
  });

  const getChipCount = (chip) => {
    let count = 0;

    currBet?.allChip?.map((c) => {
      if (c === chip) {
        count++;
      }
    });

    return count;
  };

  return (
    <>
      {!isPreviewMode && (
        <div>
          <div className="btnclass">
            {chipAmt.map((chip, index) => {
              const chipExist = currBet?.allChip?.includes(chip);
              return (
                <div key={index}>
                  <button
                    className="counterbtn"
                    onClick={() => {
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
                        chip,
                        singlebet,
                      );
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
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
                        chip,
                        singlebet,
                      );
                    }}
                  >
                    {chip} ₹{getChipCount(chip) > 0 && ` X ${getChipCount(chip)}`}
                  </button>
                  <button
                    className={chipExist ? "counterbtn" : "counterbtnDisable"}
                    disabled={!chipExist}
                    onClick={() => removeChipBet(chip, selectedBet, singlebet)}
                  >
                    -
                  </button>
                </div>
              );
            })}
          </div>
          <div>
            <p>Total : {currBet?.totalchip || 0} ₹</p>
          </div>
        </div>
      )}
    </>
  );
};

export default TooltipData;
