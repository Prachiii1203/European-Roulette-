import { useState } from "react";

const TooltipData = ({ chipAmt }) => {
  const [activeChip, setActiveChip] = useState("");
  const [chipCount, setChipCount] = useState([]);

  const addChipAmt = () => {
    const chippi = chipCount.find((chip) => chip.chipVal === activeChip);
    if (chipCount.length === 0) {
      setChipCount({
        chipVal: activeChip,
        count: 1,
      });
    } else {
      setChipCount((prevChip) => ({ ...prevChip, count: prevChip.count++ }));
    }
    console.log(chipCount);
  };

  const removeChipAmt = () => {
    const chippi = chipCount.find((chip) => chip.chipVal === activeChip);
    if (chippi) {
      setChipCount({
        chipVal: activeChip,
        count: 1,
      });
    } else {
      setChipCount((prevChip) => ({ ...prevChip, count: prevChip.count-- }));
    }
    console.log(chipCount);
  };

  return (
    <div>
      {chipAmt.map((chip, index) => (
        <div key={index}>
          <button onClick={addChipAmt}>+</button>
          <button
            className={activeChip === chip ? "selectedChipAmt" : "chipbtn"}
            style={{ border: "none" }}
            onClick={(e) => {
              setActiveChip(Number(e.target.value));
              // alert(e.target.value);
            }}
            value={chip}
          >
            {chip} ₹
          </button>
          <button onClick={removeChipAmt}>-</button>
        </div>
      ))}
    </div>
  );
};

export default TooltipData;
