import React, { useEffect, useState } from "react";
import { useExerciseStore } from '../useExerciseStore.js';
import axios from "axios";
import {useNavigate,useLocation} from "react-router-dom"

const AddSession = ({ onAdd }) => {

  const navigate = useNavigate()
  const location = useLocation()

  const apiUrl = import.meta.env.VITE_BACKEND_URL
  const userId = sessionStorage.getItem("userId")
  const selectedExercise = useExerciseStore(state => state.selectedExercise);

  const defaultSets = [
    { weight: 0, reps: 0 },
    { weight: 0, reps: 0 },
    { weight: 0, reps: 0 },
  ];
  const [sets, setSets] = useState(defaultSets);

  const updateSets = async ()=>{
    try {
      const response = await axios.post(`${apiUrl}/api/gym/updateprogress`,{userId,name:selectedExercise,sets},{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true
      })

      if(response.status===200){
        console.log(response)
        onAdd(sets);
      }
    } catch (error) {
      console.log("Error in updateSets",error)
    }
  }




  const handleChange = (index, field, value) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = value === "" ? "" : Number(value);
    setSets(updatedSets);
  };

  const handleFocus = (index, field) => {
    const updatedSets = [...sets];
    if (updatedSets[index][field] === 0) {
      updatedSets[index][field] = "";
    }
    setSets(updatedSets);
  };

  const handleBlur = (index, field) => {
    const updatedSets = [...sets];
    if (updatedSets[index][field] === "") {
      updatedSets[index][field] = 0;
    }
    setSets(updatedSets);
  };

  const handleSubmit = () => {
    const validSets = sets.filter((s) => s.weight > 0 && s.reps > 0);
    if (validSets.length === 0) return;

    updateSets()

    onAdd(sets);
    // setSets(defaultSets);
  };

  // onAdd(sets)

  return (
    <div className="bg-green-50 rounded-2xl shadow-md p-4 flex-1">
      <h3 className="text-lg font-bold mb-3 text-center">Add New Session</h3>
      <div className="flex flex-col gap-3">
        {sets.map((set, idx) => (
          <div key={idx} className="flex justify-between gap-2">
            <input
              type="number"
              placeholder="Weight (lbs)"
              value={set.weight}
              onChange={(e) => handleChange(idx, "weight", e.target.value)}
              onFocus={() => handleFocus(idx, "weight")}
              onBlur={() => handleBlur(idx, "weight")}
              className="border rounded-lg px-3 py-2 w-1/2"
            />
            <input
              type="number"
              placeholder="Reps"
              value={set.reps}
              onChange={(e) => handleChange(idx, "reps", e.target.value)}
              onFocus={() => handleFocus(idx, "reps")}
              onBlur={() => handleBlur(idx, "reps")}
              className="border rounded-lg px-3 py-2 w-1/2"
            />
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          + Add Session
        </button>
      </div>
    </div>
  );
};

export default AddSession;
