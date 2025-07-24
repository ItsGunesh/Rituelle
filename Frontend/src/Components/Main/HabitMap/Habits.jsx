import React, { useEffect, useState } from 'react'
import Cell from './Cell'
import axios from 'axios'

const Habits = () => {
  // const habits = ["Wake Up", "Meditate", "Gym", "DSA", "Web Dev", "Diet", "Junk", "Social", "Skin Care", "Reading"]
  const [habits, setHabits] = useState([])
  const [recentCompletions, setRecentCompletions] = useState([]);
  const [totalActiveDays, setTotalActiveDays] = useState(0);
  const [maxStreak,setMaxStreak] = useState(0)
  const [streak,setStreak]=useState(0)

  const userId = localStorage.getItem("userId");
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  let longestStreak = 0, currentStreak = 0;

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/habits/getHabits`, {
          params: { userId },
          withCredentials: true
        });
        // console.log("Just before Response.status")
        if (response.status === 200) {
          // console.log(response.data.data)
          setHabits(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching habits:", error);
      }
    };
    fetchHabits();
  }, []);

  useEffect(() => {
    const fetchRecentCompletions = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`${apiUrl}/users/habits/completions`, {
          params: { userId }
        });
        if (response.status === 200) {
          setRecentCompletions(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching recent completions:", error);
      }
    };
    fetchRecentCompletions();
  }, []);

  useEffect(() => {
    if (!recentCompletions.length) return;

    const total = recentCompletions.filter(day =>
      Array.isArray(day.completions) && day.completions.some(Boolean)
    ).length;

    setTotalActiveDays(total);
    
    let nowStreak = 0;
    currentStreak = 0;

    recentCompletions.forEach(day =>  {
      if (Array.isArray(day.completions) && day.completions.some(Boolean)) {
        nowStreak += 1;
        longestStreak = Math.max(longestStreak, nowStreak);
      } else {
        nowStreak = 0;
      }
    });

    setMaxStreak(longestStreak)

    for (let i = 0; i <recentCompletions.length; i++) {
      if (Array.isArray(recentCompletions[i].completions) && recentCompletions[i].completions.some(Boolean)) currentStreak++;
      else break;
    }

    setStreak(currentStreak)


  }, [recentCompletions]);



  return (
    <>
      <div className='p-4 border-2 rounded-2xl border-gray-400 flex gap-4 bg-white'>
        <div className='text-xs font-bold w-fit flex flex-col gap-0'>
          {habits.map((item, ind) => (
            <p key={ind}>{item}</p>
          ))}
        </div>
        <div className='flex flex-col'>
          {habits.map((habit, rowIdx) => (
            <div key={habit} className='flex items-center gap-1 py-0.5'>
              {recentCompletions.map((entry, colIdx) => (
                <div
                  key={entry.date}
                  className={`w-3 h-3 rounded-sm cursor-pointer  ${entry.completions && entry.completions[rowIdx] ? 'bg-gray-500 border-1 border-gray-500' : 'bg-gray-300 border-1 border-gray-300'}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-between text-sm font-bold pt-3 text-gray-600'>
        <p>Active Days : {totalActiveDays}</p>
        <p>Max Streak : {maxStreak}</p>
        <p>Current Streak : {streak}</p>
      </div>
    </>
  )
}

export default Habits

