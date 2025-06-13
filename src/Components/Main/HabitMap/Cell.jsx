import React, { useState } from 'react'

const Cell = () => {
  const [isComplete,setIsComplete]=useState(false)
  const habits = ["Wake Up", "Meditate", "Gym", "DSA", "Web Dev", "Diet", "Junk", "Social", "Skin Care", "Reading"]
  return (
    <><div className='flex flex-col items-center gap-1 py-0.5'>
        {habits.map((item,index)=>{
          return <div key={index} className={`w-3 h-3 bg-gray-400 rounded-sm ${isComplete? 'bg-green-500': 'bg-gray-400'}`} onClick={(e)=>e.target(setIsComplete(!isComplete))}></div>
        })}      
    </div>
      
    </>
  )
}

export default Cell
