import React from "react";

import "./toggle-switch.css";

const ToggleSwitch = ({ theme, onChange }) => {
  return (
    <div className="toggle-switch">
      <label className="switch">
        <input type="checkbox" checked={theme === "dark"} onChange={onChange} />
        <span className="slider round" />
      </label>
    </div>
  );
};

export default ToggleSwitch;
