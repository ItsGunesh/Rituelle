import React, { useState, useEffect } from 'react';
import ExerciseChart from './ExerciseChart';
import SessionHistory from './SessionHistory';
import AddSession from './AddSession';
import axios from 'axios';
import { useExerciseStore } from '../useExerciseStore.js';

const MainIndex = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const userId = sessionStorage.getItem("userId");

  const selectedExercise = useExerciseStore(state => state.selectedExercise);
  const [fetchedSessions, setFetchedSesssion] = useState([]);

  const getExeHistory = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/gym/fetchprogress`, {
        params: { userId, name: selectedExercise },
        withCredentials: true
      });

      if (response.status === 200) {
        setFetchedSesssion(response.data.data);
      }
    } catch (error) {
      console.log("Error in Chart", error);
    }
  };

  useEffect(() => {
    if (selectedExercise) {
      getExeHistory();
    }
  }, [selectedExercise]);

  const chartData = fetchedSessions.map(session => {

    const totalVolume = session.sets.reduce((sum, set) => sum + (set.weight * set.reps), 0);
    return {
      date: new Date(session.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      volume: totalVolume
    };
  }).reverse();


  const handleAddSession = (newSets) => {
    const totalVolume = newSets.reduce((sum, set) => sum + (set.weight * set.reps), 0);
    const newSession = {
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      sets: newSets,
      volume: totalVolume
    };
    setFetchedSesssion([newSession, ...fetchedSessions]);
  };

  useEffect(()=>{

  },[fetchedSessions])

  return (
    <div className="w-full px-4 pb-4">
      <ExerciseChart data={chartData} name={selectedExercise || ""} />
      <div className="flex gap-4 mt-4 responsive-flex">
        <SessionHistory sessions={fetchedSessions} />
        <AddSession onAdd={handleAddSession} />
      </div>
    </div>
  );
};

export default MainIndex;
