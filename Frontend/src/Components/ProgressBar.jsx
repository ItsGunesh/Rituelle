import React from "react";

const ProgressBar = ({ value, max = 100 }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden my-4">
      <div
        className="bg-gray-500 h-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;