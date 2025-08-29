import React, { useState } from "react";
import ExerciseItem from "./ExerciseItem";
import axios from "axios";

const MuscleGroup = ({ group, exercises }) => {
  const [open, setOpen] = useState(group);
  const [addBox, setAddBox] = useState(false);
  const [addExercise, setAddExercise] = useState("");

  let newExercises = exercises

  const apiUrl = import.meta.env.VITE_BACKEND_URL
  const userId = sessionStorage.getItem("userId")

  const toggleAdd = (e) => {
    e.stopPropagation();
    setAddBox(!addBox);
  };

  const handleAddExercise = async() => {
    if (addExercise.trim() === "") return;

    try {
      const response = await axios.post(`${apiUrl}/api/gym/addexercise`,{name:addExercise,userId,muscleGroup:group},{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true
      })

      if(response.status === 200){
        console.log("addExercise worked successfully")
        newExercises = [...exercises,addExercise] 
      }
    } catch (error) {
      
    }
    console.log("New exercise added:", addExercise);
    setAddExercise("");
    setAddBox(false);
  };

  return (
    <div className="mb-3 relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 shadow-sm text-left font-medium relative"
      >
        {group}
        {open && (
          <p
            className="text-xs bg-white rounded-2xl px-2 py-1 cursor-pointer shadow-md"
            onClick={toggleAdd}
          >
            Add Exercise
          </p>
        )}
      </button>

      {open && addBox && (
        <div className="absolute right-2 top-12 z-50 bg-white shadow-lg rounded-lg p-3 w-48">
          <input
            type="text"
            value={addExercise}
            onChange={(e) => setAddExercise(e.target.value)}
            placeholder="Exercise name"
            className="border px-2 py-1 w-full rounded-lg mb-2"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setAddBox(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleAddExercise}
              className="text-sm bg-slate-700 text-white px-3 py-1 rounded-lg hover:bg-slate-900 font-semibold"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {open && (
        <ul className="mt-2 ml-4 space-y-1">
          {newExercises.map((exercise, idx) => (
            <ExerciseItem key={idx} name={exercise} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MuscleGroup;
