import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigator from './Components/Navigator/Navigator'
import TaskIndex from './Components/Main/Tasks/TaskIndex'
import HabitsIndex from './Components/Main/HabitMap/HabitsIndex'
import { HabitContextProvider } from './Context/HabitContextProvider.jsx'
import LoginIndex from './Components/Login/LoginIndex.jsx'
import SignUpIndex from './Components/SignUp/SignUpIndex.jsx'
import HabitsTodoIndex from './Components/HabitsInput/HabitsTodoIndex.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Main/Dashboard.jsx'


function App() {
  return (
    <>
      <HabitContextProvider>

        <BrowserRouter>
          <Routes>
            <Route path="/api/" element={<Dashboard />} />
            <Route path="/api/login" element={<LoginIndex />} />
            <Route path="/api/signup" element={<SignUpIndex />} />
            <Route path="/api/commitment" element={<HabitsTodoIndex />} />
          </Routes>
        </BrowserRouter>
      </HabitContextProvider>
    </>
  )
}

export default App
