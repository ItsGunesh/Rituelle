import React, { useState, useContext, useEffect } from 'react'
import DailyProgress from './DailyProgress'
import HabitCard from './HabitCard'
import { HabitContext } from '../../../Context/HabitContextProvider.jsx'
import axios from 'axios'

const TaskIndex = () => {

  const [habits, setHabits] = useState([])

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get("http://localhost:7000/users/habits/getHabits", {
          params: { userId },
          withCredentials: true
        });
        console.log("Just before Response.status")
        if (response.status === 200) {
          console.log(response.data.data)
          setHabits(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching habits:", error);
      }
    };
    fetchHabits();
  }, []);

  const updateHabitStatus = (idx) => {
    setHabits(prevHabits =>
      prevHabits.map((habit, i) =>
        i === idx ? { ...habit, isComplete: !habit.isComplete } : habit
      )
    );
  };

  return (
    <>
      <div className='w-[20%]  flex flex-col py-2 px-4 rounded-2xl bg-gray-100 shadow-xl border-gray-400 border-1'>
        <h3 className='font-bold text-xl px-4'>Todays Habits</h3>
        <DailyProgress />
        {habits.map((habit, idx) => (
          <HabitCard
            key={idx}
            name={habit}
          // isComplete={habit.isComplete}
          // habitIndex={idx}
          // updateHabitStatus={updateHabitStatus}
          />
        ))}
        <div>
          <button className='my-4 p-4 bg-gray-100 rounded-2xl shadow-xl border-gray-400 border-2 items-center'>Update</button>
        </div>
      </div>

    </>
  )
}

export default TaskIndex
