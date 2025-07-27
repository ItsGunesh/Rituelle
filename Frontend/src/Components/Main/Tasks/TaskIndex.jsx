import React, { useState, useContext, useEffect } from 'react'
import DailyProgress from './DailyProgress'
import HabitCard from './HabitCard'
import { HabitContext } from '../../../Context/HabitContextProvider.jsx'
import axios from 'axios'
import { format ,subDays} from 'date-fns'; 

const TaskIndex = () => {

  const [habits, setHabits] = useState([])
  const [completedHabits, setCompletedHabits] = useState([]);
  const [todaysHabits,setTodaysHabits] = useState([])
  const [completedToday,setCompletedToday] = useState(0)
  const [recentCompletions,setRecentCompletions]=useState([])

  const userId = sessionStorage.getItem("userId");
  // const userId = localStorage.getItem("userId");

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
    const date = format(new Date(), 'yyyy-MM-dd');
    // today.setHours(0, 0, 0, 0);
    // const date = today.toISOString();
    console.log("DATE",date)
    

    try {
      const response = await axios.post(
        `${apiUrl}/users/habits/updateDB`,
        { userId, date, completedHabits },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials:true
        }
      );

      if (response.status === 200) {
        console.log("Updated DB");
        // window.location.reload(); // Reload the whole page after update
        await fetchRecentCompletions();
      }
    } catch (error) {
      console.log("Could not update DB", error);
    }
  };

  //  useEffect(() => {
  //   const fetchRecentCompletions = async () => {
  //     const userId = localStorage.getItem("userId");
  //     try {
  //       const response = await axios.get(`${apiUrl}/users/habits/completions`, {
  //         params: { userId }
  //       });
  //       if (response.status === 200) {
  //         setTodaysHabits(response.data.data[0].completions);
  //         setCompletedToday(response.data.data[0].completions.filter((val)=>val===true).length);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching recent completions:", error);
  //     }
  //   };
  //   fetchRecentCompletions();
  // }, []);

  const fetchRecentCompletions = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users/habits/completions`, {
        params: { userId }
      });
      if (response.status === 200) {
        const completedData = response.data.data;
        const dateMap = new Map();
        completedData.forEach(entry => {
          dateMap.set(entry.date.slice(0, 10), entry);
        });

        const lastDays = [];
        for (let i = 59; i >=0; i--) {
          const dateStr = format(subDays(new Date(), i), 'yyyy-MM-dd');
          lastDays.push({
            date: dateStr,
            completions: dateMap.has(dateStr) ? dateMap.get(dateStr).completions : new Array(habits.length).fill(false),
          });
        }

        setRecentCompletions(lastDays);
        setCompletedHabits(recentCompletions[59].completions)
        setTodaysHabits(recentCompletions[59].completions)
        setCompletedToday(lastDays[59].completions.filter((val)=>val===true).length)
      }
    } catch (error) {
      console.error("Error fetching recent completions:", error);
    }
  };

 useEffect(() => {
  fetchRecentCompletions();
},[habits]);


  // console.log("Debug",todaysHabits)

  return (
    <>
      <div className='w-[20%] h-fit flex flex-col py-2 px-4 rounded-2xl bg-gradient-to-t from-blue-50 via-slate-100 to-blue-50 shadow-xl border-1 border-gray-300 '>
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
          <button onClick={updateDB} className='my-8 p-4 font-bold text-xl text-black px-4 py-1 rounded-md hover:transition-transform duration-100 hover:scale-110 hover:text-black'>Update</button>
        </div>
      </div>

    </>
  )
}

export default TaskIndex
