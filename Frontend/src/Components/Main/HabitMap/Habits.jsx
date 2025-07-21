import React,{useEffect,useState} from 'react'
import Cell from './Cell'
import axios from 'axios'

const Habits = () => {
  // const habits = ["Wake Up", "Meditate", "Gym", "DSA", "Web Dev", "Diet", "Junk", "Social", "Skin Care", "Reading"]
  const [habits,setHabits] = useState([])
  const [recentCompletions, setRecentCompletions] = useState([]);

  const userId = localStorage.getItem("userId");
  const apiUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/habits/getHabits`, {
          params: { userId },
          withCredentials: true
        });
        // console.log("Just before Response.status")
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

  useEffect(() => {
    const fetchRecentCompletions = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`${apiUrl}/users/habits/completions`, {
          params: { userId }
        });
        if (response.status === 200) {
          setRecentCompletions(response.data.data); // Array of {date, completions}
        }
      } catch (error) {
        console.error("Error fetching recent completions:", error);
      }
    };
    fetchRecentCompletions();
  }, []);
  
  return (
    <>
      <div className='p-4 border-2 rounded-2xl border-gray-400 flex gap-4 bg-white'>
        <div className='text-xs font-bold w-fit flex flex-col gap-0'>
          {habits.map((item,ind)=>(
            <p key={ind}>{item}</p>
          ))}
        </div>
        <div className='flex gap-1'>
          {recentCompletions.map(entry => {
            const dateStr = new Date(entry.date).toISOString().slice(0, 10);
            const isCompleted = entry.completions && Object.keys(entry.completions).length > 0;
            return (
              <Cell key={dateStr} date={entry.date} isCompleted={isCompleted} />
            );
          })}
        </div>
      </div>
      <div className='flex justify-between text-sm font-bold pt-3 text-gray-600'>
        <p>Days Completed</p>
        <p>Max Streak</p>
        <p>Current Streak</p>
      </div>
    </>
  )
}

export default Habits

