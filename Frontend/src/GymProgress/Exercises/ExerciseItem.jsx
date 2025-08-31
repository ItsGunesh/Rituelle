import React, { useState } from "react";

const ExerciseItem = ({ name , onClick }) => {
  return (
    <li className="cursor-pointer px-3 py-1 hover:bg-blue-50 rounded-md" onClick={onClick}>
      {name}
    </li>
  );
};

export default ExerciseItem