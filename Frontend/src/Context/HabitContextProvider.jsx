import React, { createContext, useState } from "react";

export const HabitContext = createContext();

const initialHabits = [
  { id: 1, name: "Wake Up", isComplete: false },
  { id: 2, name: "Meditate", isComplete: false },
  { id: 3, name: "Gym", isComplete: false },
  { id: 4, name: "DSA", isComplete: false },
  { id: 5, name: "Web Dev", isComplete: false },
  { id: 6, name: "Diet", isComplete: false },
  { id: 7, name: "Junk", isComplete: false },
  { id: 8, name: "Social", isComplete: false },
  { id: 9, name: "Skin Care", isComplete: false },
  { id: 10, name: "Reading", isComplete: false },
];

export const HabitContextProvider = ({ children }) => {
  const [habits, setHabits] = useState(initialHabits);

  return (
    <HabitContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitContext.Provider>
  );
};