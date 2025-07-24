import React, { useState, useEffect } from 'react'
import Habits from './Habits'
import MaxMin from './MaxMin'
import SideQuest from './SideQuest'
import axios from 'axios'

const HabitsIndex = () => {

  const [habits, setHabits] = useState([])
  const [maxCount,setMaxCount] = useState(0)
  const [minCount,setMinCount] = useState(0)
  const [bestHabitIndex,setBestHabitIndex] = useState(0)
  const [worstHabitIndex,setWorstHabitIndex] = useState(0)
  const [recentCompletions, setRecentCompletions] = useState([]);
  const apiUrl = import.meta.env.VITE_BACKEND_URL
  const userId = localStorage.getItem("userId")

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
          // console.log(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching recent completions:", error);
      }
    };
    fetchRecentCompletions();
  }, []);

  // console.log("RECENT", recentCompletions)


  useEffect(() => {

    if (!recentCompletions || recentCompletions.length === 0) return;

    // console.log("recent:",recentCompletions)
    const habitCounts = new Array(recentCompletions[0].completions.length).fill(0);

    recentCompletions.forEach(day => {
      if(Array.isArray(day.completions) && day.completions.some(Boolean)){
        day.completions.forEach((completed, idx) => {
        if (completed) habitCounts[idx]++;
      });
      }
      
    });
    setMaxCount(Math.max(...habitCounts))
    setMinCount(Math.min(...habitCounts))
    setBestHabitIndex(habitCounts.indexOf(maxCount))
    // console.log("BEST",bestHabitIndex)
    setWorstHabitIndex(habitCounts.indexOf(minCount))
    // console.log("worst",worstHabitIndex)
  }, [recentCompletions])


  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='p-4 bg-gray-100 w-[75vw] h-fit border-1 rounded-2xl border-gray-400 shadow-xl '>
          <h3 className='font-bold text-2xl py-4'>Habits Heatmap</h3>
          <Habits />
        </div>
        {/* <div className='flex justify-between'>
        <SideQuest habit={"Side Quest"} type={"Learn Next.js"}/>
        <SideQuest habit={"Side Quest"} type={"Learn Next.js"}/>
        <SideQuest habit={"Side Quest"} type={"Learn Next.js"}/>
        <SideQuest habit={"Side Quest"} type={"Learn Next.js"}/>
      </div> */}
        <div className='flex justify-between'>
          <MaxMin habit={"Weekly Progress"} type={"5/7"} />
          <MaxMin habit={"Monthly Progress"} type={"42/70"} />
          <MaxMin habit={habits[bestHabitIndex]} type={`Best kept habit : ${maxCount} Days`} />
          <MaxMin habit={habits[worstHabitIndex]} type={`Worst kept habit : ${minCount} Days`} />
        </div>

      </div>
    </>
  )
}

export default HabitsIndex
