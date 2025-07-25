import React, { useState, useContext, useEffect } from 'react'
import DailyProgress from './DailyProgress'
import HabitCard from './HabitCard'
import { HabitContext } from '../../../Context/HabitContextProvider.jsx'
import axios from 'axios'

const TaskIndex = () => {

  const [habits, setHabits] = useState([])
  const [completedHabits, setCompletedHabits] = useState([]);
  const [todaysHabits,setTodaysHabits] = useState([])
  const [completedToday,setCompletedToday] = useState(0)

  const userId = localStorage.getItem("userId");

  const apiUrl = import.meta.env.VITE_BACKEND_URL

  const fetchHabits = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users/habits/getHabits`, {
        params: { userId },
        withCredentials: true
      });
      if (response.status === 200) {
        setHabits(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching habits:", error);
    }
  };
  // console.log(habits)

  useEffect(() => {
    fetchHabits();
  }, []);

  const updateHabitStatus = (idx) => {
    setHabits(prevHabits =>
      prevHabits.map((habit, i) =>
        i === idx ? { ...habit, isComplete: !habit.isComplete } : habit
      )
    );
  };
  const toggleHabit = (habitName) => {
    setCompletedHabits(prev =>
      prev.includes(habitName)
        ? prev.filter(h => h !== habitName)
        : [...prev, habitName]
    );
  };
  const updateDB = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = today.toISOString();
    

    try {
      const response = await axios.post(
        "http://localhost:7000/users/habits/updateDB",
        { userId, date, completedHabits },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Updated DB");
        window.location.reload(); // Reload the whole page after update
      }
    } catch (error) {
      console.log("Could not update DB", error);
    }
  };

   useEffect(() => {
    const fetchRecentCompletions = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`${apiUrl}/users/habits/completions`, {
          params: { userId }
        });
        if (response.status === 200) {
          setTodaysHabits(response.data.data[0].completions);
          setCompletedToday(response.data.data[0].completions.filter((val)=>val===true).length);
        }
      } catch (error) {
        console.error("Error fetching recent completions:", error);
      }
    };
    fetchRecentCompletions();
  }, []);


  console.log("Debug",todaysHabits)

  return (
    <>
      <div className='w-[20%] h-fit flex flex-col py-2 px-4 rounded-2xl bg-gray-200 shadow-xl border-gray-600 border-2'>
        <h3 className='font-bold text-2xl px-4 text-center'>Todays Habits</h3>
        <DailyProgress data={completedToday}/>
        {habits.map((habit, idx) => (
          <HabitCard
            key={idx}
            name={habit}
            isComplete={todaysHabits[idx]}
            toggleHabit={() => toggleHabit(habit)}
          />
        ))}
        <div className='flex justify-center'>
          <button onClick={updateDB} className='my-4 p-4 bg-gray-100 rounded-2xl shadow-xl border-gray-900 border-2 font-bold text-xl items-center hover:bg-gray-600 hover:text-white'>Update</button>
        </div>
      </div>

    </>
  )
}

export default TaskIndex
