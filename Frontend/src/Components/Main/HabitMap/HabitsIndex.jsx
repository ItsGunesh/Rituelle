import React, { useState, useEffect } from 'react'
import Habits from './Habits'
import MaxMin from './MaxMin'
import SideQuest from './SideQuest'
import axios from 'axios'
import Quote from '../../Quote/Quote'
import Q from "../../Quote/quotes.json"

const HabitsIndex = () => {

  const [habits, setHabits] = useState([])
  const [maxCount,setMaxCount] = useState(0)
  const [minCount,setMinCount] = useState(0)
  const [bestHabitIndex,setBestHabitIndex] = useState(0)
  const [worstHabitIndex,setWorstHabitIndex] = useState(0)
  const [recentCompletions, setRecentCompletions] = useState([]);
  const [past7,setPast7]=useState(0)
  const [past30,setPast30]=useState(0)
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


    setPast7(recentCompletions.slice(-7).filter(day =>Array.isArray(day.completions) && day.completions.some(Boolean)).length)
    setPast30(recentCompletions.slice(-30).filter(day =>Array.isArray(day.completions) && day.completions.some(Boolean)).length)
  }, [recentCompletions])

  const [newQuote,setnewQuote]=useState()

  useEffect(()=>{
    setnewQuote(Q[Math.floor(Math.random() * Q.length)].quote)
    // console.log(Math.floor(Math.random() * Q.length))
  },[])


  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='p-4 bg-gradient-to-r from-blue-50 via-blue-50 to-blue-50 w-[75vw] h-fit rounded-2xl drop-shadow-xl border-1 border-gray-300 '>
          <h3 className='font-bold text-2xl py-4 '>Habits Heatmap</h3>
          <Habits />
        </div>
        {/* <div className='flex justify-between'>
        <SideQuest habit={"Side Quest"} type={"Learn Next.js"}/>
        <SideQuest habit={"Side Quest"} type={"Learn Next.js"}/>
        <SideQuest habit={"Side Quest"} type={"Learn Next.js"}/>
        <SideQuest habit={"Side Quest"} type={"Learn Next.js"}/>
      </div> */}
        <div className='flex justify-between '>
          <MaxMin habit={"Weekly Progress"} type={`${past7}/7`} css={`bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200 border-1 `}/>
          <MaxMin habit={"Monthly Progress"} type={`${past30}/30`} css={`bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200 border-1 `}/>
          <MaxMin habit={`Best kept habit`} type={`${habits[bestHabitIndex]} for ${maxCount} Days`} css={`bg-gradient-to-br from-yellow-50 to-amber-100 border-amber-200 border-1 `}/>
          <MaxMin habit={`Worst kept habit`} type={` ${habits[worstHabitIndex]} for ${minCount} Days`} css={`bg-gradient-to-br from-orange-50 to-red-100 border-orange-200 border-1 `} />
        </div>
        <div>
          <Quote quote={newQuote}/>
        </div>

      </div>
    </>
  )
}

export default HabitsIndex
