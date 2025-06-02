import React from 'react'
import ColorCylinder from '../Global/ColorCylinder'

const Navbar = () => {
  return (
    <>
      <div className='flex justify-between items-center border-2 p-2'>
        <div className='flex flex-col text-left gap-0'>
            <span className='font-extrabold text-3xl'>Rituelle</span>
            <span className='text-sm font-medium'>Track your daily habits and build lasting routines</span>
        </div>
        <div className='flex gap-3 text-center items-center'>
          <ColorCylinder className=" bg-violet-200 text-violet-900"/>
          <ColorCylinder className=" bg-yellow-200 text-yellow-900"/>
          <div className='flex flex-col'>
            <span>Today</span>
            <span className='font-bold text-2xl'>3/6</span>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Navbar
