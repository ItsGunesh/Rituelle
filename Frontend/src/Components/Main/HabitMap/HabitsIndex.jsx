import React , {useState,useEffect}from 'react'
import Habits from './Habits'
import MaxMin from './MaxMin'
import SideQuest from './SideQuest'
import axios from 'axios'

const HabitsIndex = () => {

  const[habits,setHabits] = useState([])
  const apiUrl = import.meta.env.VITE_BACKEND_URL

  // useEffect(() => {
  //   const fetchHabits = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/users/habits/getHabits`, {
  //         params: { userId },
  //         withCredentials: true
  //       });
  //       // console.log("Just before Response.status")
  //       if (response.status === 200) {
  //         console.log(response.data.data)
  //         setHabits(response.data.data);
  //       }
  //     } catch (error) {
  //       console.log("Error fetching habits:", error);
  //     }
  //   };
  //   fetchHabits();
  // }, []);
  

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='p-4 bg-gray-100 w-[75vw] h-fit border-1 rounded-2xl border-gray-400 shadow-xl '>
        <h3 className='font-bold text-2xl py-4'>Habits Heatmap</h3>
        <Habits/>
      </div>
      {/* <div className='flex justify-between'>
        <SideQuest habit={"Side Quest"} type={"Learn Next.js"}/>
        <SideQuest habit={"Side Quest"} type={"Learn Next.js"}/>
        <SideQuest habit={"Side Quest"} type={"Learn Next.js"}/>
        <SideQuest habit={"Side Quest"} type={"Learn Next.js"}/>
      </div> */}
      <div className='flex justify-between'>
        <MaxMin habit={"Weekly Progress"} type={"5/7"}/>
        <MaxMin habit={"Monthly Progress"} type={"42/70"}/>
        <MaxMin habit={"Meditate"} type={"Best kept habit"}/>
        <MaxMin habit={"Social"} type={"Worst kept habit"}/>
      </div>
      
      </div>
    </>
  )
}

export default HabitsIndex
