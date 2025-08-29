import React, { useState } from "react";

const ExerciseItem = ({ name }) => {
  return (
    <li className="cursor-pointer px-3 py-1 hover:bg-blue-50 rounded-md">
      {name}
    </li>
  );
};

export default ExerciseItem