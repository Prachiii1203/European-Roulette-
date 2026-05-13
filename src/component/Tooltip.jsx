import { useState } from "react";
import "./Tooltip.css";

const Tooltip = ({ direction, content, children }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {visible && (
        <div className={`tooltip-box tooltip-${direction}`}>{content}</div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
