import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Cell from './Components/Heatmap/Cell.jsx'
import Map from './Components/Heatmap/Map.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import Sidebar from './Components/Sidebar/Sidebar.jsx'
import Main from "./Components/Main/Main.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='flex'>
      <div className='border-2 w-[20vw]'>
        <Sidebar/>
      </div>
      <div className='w-[80vw]'>
        <Navbar/>
        <Main/>
      </div>
    </div>
  </StrictMode>,
)
