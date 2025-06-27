import React, { createContext, useState } from "react";

// Create the context
export const HabitContext = createContext();

// Create the provider component
const HabitContextProvider = ({ children }) => {
  // Example state: you can adjust this to fit your needs
  const [habits, setHabits] = useState([]);

  return (
    <HabitContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitContext.Provider>
  );
};

export default HabitContextProvider;