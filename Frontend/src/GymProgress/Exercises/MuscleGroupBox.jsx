import React, { useEffect, useState } from 'react'
import MuscleGroup from './MuscleGroup';
import axios from 'axios';

const initialMuscleGroups = {
  Back: [],
  Bicep: [],
  Chest: [],
  Tricep: [],
  Shoulder: [],
  Legs: [],
  Abs: []
};

const MuscleGroupBox = () => {

  const [muscleGroups, setMuscleGroups] = useState(initialMuscleGroups);

  const apiUrl = import.meta.env.VITE_BACKEND_URL
  const userId = sessionStorage.getItem("userId")


  const fetchExeNames = async () => {
    try {
      // const userId = sessionStorage.getItem("userId")
      const response = await axios.get(`${apiUrl}/api/gym/fetchexedata`,
        {
          params: { userId },
          withCredentials: true
        }
      )

      if (response.status === 200) {
        // console.log(response.data.data)

        const fetchedExe = response.data.data

        const updatedMuscleGroups = { ...initialMuscleGroups };
        fetchedExe.forEach(exe => {
          if (exe.muscleGroup in updatedMuscleGroups) {
            if (!updatedMuscleGroups[exe.muscleGroup].includes(exe.name)) {
              updatedMuscleGroups[exe.muscleGroup].push(exe.name);
            }
          }
        });

        setMuscleGroups(updatedMuscleGroups);
      }
    } catch (error) {
      console.log("Error calling fetchExeNames", error)
    }
  }

  useEffect(() => {
    fetchExeNames()
  }, [muscleGroups])

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
