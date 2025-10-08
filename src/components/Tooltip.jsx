import React from "react";

const Tooltip = ({ text }) => {
  return (
    <span className="group relative inline-block ml-1">
      <span className="cursor-help text-blue-500 hover:text-blue-700">❓</span>
      <span className="tooltip -top-10 left-1/2 transform -translate-x-1/2">
        {text}
      </span>
    </span>
  );
};

export default Tooltip;
