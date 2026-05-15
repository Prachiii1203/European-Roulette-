const DataMapping = ({ mappingVal }) => {
  return (
    <div>
      {" "}
      {mappingVal.map((abet, index) => (
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
  );
};

export default DataMapping;
