import React, { useEffect, useState } from 'react'
import Q from "./quotes.json"

const Quote = ({quote}) => {
  

  return (
    <>
      <div className='bg-gradient-to-r px-4 py-3 from-blue-50 via-blue-50 to-blue-50 border-1 border-gray-300  rounded-2xl w-[100%] shadow-lg'>
        <p className='font-bold text-center text-2xl'>{quote}</p>
      </div>
    </>
  )
}

export default Quote
