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
import HabitsTodoIndex from './Components/HabitsInput/HabitsTodoIndex.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Main/Dashboard.jsx'


function App() {
  return (
    <>
      <HabitContextProvider>
      
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/login" element={<LoginIndex/>} />
            <Route path="/signup" element={<SignUpIndex/>} />
            <Route path="/user" element={<HabitsIndex/>} />
          </Routes>
        </BrowserRouter>
      <HabitsTodoIndex/>
      </HabitContextProvider>
    </>
  )
}

export default App
