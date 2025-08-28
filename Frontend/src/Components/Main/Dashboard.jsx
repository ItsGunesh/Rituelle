import React from 'react'
import Navigator from '../Navigator/Navigator.jsx'
import TaskIndex from '../Main/Tasks/TaskIndex.jsx'
import HabitsIndex from '../Main/HabitMap/HabitsIndex.jsx'
import Quote from '../Quote/Quote.jsx'
import HomeNav from './HomeNav.jsx'

const Dashboard = () => {
  return (
    <>
      <div className='bg-gradient-to-br from-slate-100 to-slate-200 w-[100%]'>
        <div className='sticky top-0 z-999'>
          <Navigator />
        </div>
        <div>
          <HomeNav/>
        </div>
        <div className='h-[100%] w-[100%] py-4 px-10 box-border gap-4 responsive-flex'>
          {/* <div className='text-center p-2 bg-yellow-300 text-black font-bold'>MOBILE: flex-col</div> */}
          <HabitsIndex />
          <TaskIndex />
        </div>
        {/* <Quote/> */}
      </div>
    </>
  )
}

export default Dashboard
