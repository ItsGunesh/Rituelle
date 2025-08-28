import React, { useState } from "react";

// 1. Exercise Component
const ExerciseItem = ({ name }) => {
  return (
    <li className="cursor-pointer px-3 py-1 hover:bg-blue-50 rounded-md">
      {name}
    </li>
  );
};

export default ExerciseItem