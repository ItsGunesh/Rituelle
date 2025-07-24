import React, { useContext , useState , useEffect } from 'react';
import { HabitContext } from '../../../Context/HabitContextProvider.jsx';
import axios from 'axios';


const Cell = ({ isCompleted, date }) => {
  // const { habits, setHabits } = useContext(HabitContext);

  const [habits,setHabits] = useState([])

  const userId = localStorage.getItem("userId");

  const apiUrl = import.meta.env.VITE_BACKEND_URL

  // console.log(habits.length)

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

  const toggleHabit = (index) => {
    setHabits(prevHabits =>
      prevHabits.map((habit, i) =>
        i === index ? { ...habit, isComplete: !habit.isComplete } : habit
      )
    );
  };

  // If isCompleted is provided, render a single cell for the heatmap
  if (typeof isCompleted !== "undefined") {
    return (
      <div
        className={`w-6 h-6 rounded-sm m-1 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}
        title={date ? new Date(date).toLocaleDateString() : ""}
      ></div>
    );
  }

  return (
    <div className='flex flex-col items-center gap-1 py-0.5'>
      {habits.map((habit, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-sm cursor-pointer border-gray-700 border-1 ${
            habit.isComplete ? 'bg-green-500' : 'bg-gray-400'
          }`}
          // onClick={() => toggleHabit(index)}
        ></div>
      ))}
    </div>
  );
};

export default Cell;
