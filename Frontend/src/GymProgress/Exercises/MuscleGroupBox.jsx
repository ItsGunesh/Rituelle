import React from 'react'
import MuscleGroup from './MuscleGroup';

const MuscleGroupBox = () => {
  const muscleGroups = {
    Back: ["Pull-ups", "Lat Pulldown", "Barbell Rows", "T-Bar Rows", "Cable Rows"],
    Bicep: [],
    Chest: [],
    Tricep: [],
    Shoulder: [],
    Legs: [],
    Abs:[]
  };

  return (
    <div className="mx-5 mb-5 md:w-72 p-4 rounded-2xl shadow-lg bg-white h-fit">
      <h2 className="text-lg font-bold mb-4">Muscle Groups</h2>
      {Object.entries(muscleGroups).map(([group, exercises], idx) => (
        <MuscleGroup key={idx} group={group} exercises={exercises} />
      ))}
    </div>
  );
};


export default MuscleGroupBox
