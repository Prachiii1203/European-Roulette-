import { act, useState } from "react";

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
}) => {
  const [activeChip, setActiveChip] = useState(null);
  // const [activeChip, setActiveChip] = useState(chipAmt[0]);

  const currBet = allbet?.find((cbet) => {
    if (selectedBet === "single Bet" && cbet.userId === activePlayer.id && cbet.singlebetVal === singlebet) {
      return true;
    } else if (selectedBet === cbet.betType && cbet.userId === activePlayer.id) {
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
      return c;
    });

    return count;
  };

  const chipDisable = currBet?.allChip.includes(activeChip);

  return (
    <div>
      <p>Click on Chip to select</p>
      <div className="btnclass">
        <button
          className="counterbtn"
          onClick={() => {
            if (activeChip !== null) {
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
                activeChip,
                singlebet,
              );
            }
          }}
        >
          +
        </button>

        {chipAmt.map((chip, index) => (
          <div key={index}>
            <button
              className={activeChip === chip ? "selectedChipAmt" : "chipbtn"}
              style={{ border: "none" }}
              onClick={() => {
                setActiveChip(chip);
              }}
            >
              {chip} ₹{getChipCount(chip) > 0 && ` X ${getChipCount(chip)}`}
            </button>
          </div>
        ))}

        <button
          className={chipDisable ? "counterbtn" : "counterbtnDisable"}
          disabled={!chipDisable}
          onClick={() => {
            if (activeChip !== null) {
              removeChipBet(activeChip, selectedBet, singlebet);
            }
          }}
        >
          -
        </button>
      </div>

      <div>
        <p>Total :{currBet?.totalchip || 0} ₹</p>
      </div>
    </div>
  );
};

export default TooltipData;
