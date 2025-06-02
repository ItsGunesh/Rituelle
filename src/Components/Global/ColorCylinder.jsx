import React from 'react'

const ColorCylinder = ({className}) => {
  return (
    <>
      <div className={`flex w-fit h-fit p-2 rounded-4xl font-bold text-center items-center ${className}`}>
        <span>450 XP</span>
      </div>
    </>
  )
}

export default ColorCylinder
