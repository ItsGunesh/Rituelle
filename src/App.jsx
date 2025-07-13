import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigator from './Components/Navigator/Navigator'
import TaskIndex from './Components/Main/Tasks/TaskIndex'
import HabitsIndex from './Components/Main/HabitMap/HabitsIndex'
import {HabitContextProvider} from './Context/HabitContextProvider.jsx'
import LoginIndex from './Components/Login/LoginIndex.jsx'
import SignUpIndex from './Components/SignUp/SignUpIndex.jsx'


function App() {
  return (
    <>
      <HabitContextProvider>
      {/* <div className='sticky top-0 z-999'>
        <Navigator/>
      </div> */}
      {/* <div className='bg-gray-200 h-[100%] w-[100%] py-4 px-10 box-border flex gap-4'>
        <HabitsIndex/>
        <TaskIndex/>
      </div>
      <div>
      </div> */}
      {/* <LoginIndex/> */}
      <SignUpIndex/>
      </HabitContextProvider>
    </>
  )
}

export default App
