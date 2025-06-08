import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigator from './Components/Navigator/Navigator'
import TaskIndex from './Components/Main/Tasks/TaskIndex'
import HabitsIndex from './Components/Main/HabitMap/HabitsIndex'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='sticky top-0 z-999'>
        <Navigator/>
      </div>
      <div className='bg-gray-200 h-[100%] w-[100%] py-4 px-10 box-border flex gap-4'>
        <TaskIndex/>
      </div>
      <div>
      </div>
    </>
  )
}

export default App
