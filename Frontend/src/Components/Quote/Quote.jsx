import React, { useEffect, useState } from 'react'
import Q from "./quotes.json"

const Quote = ({quote}) => {
  

  return (
    <>
      <div className='bg-gray-100 border-2 p-4 border-gray-600 rounded-2xl w-[100%] shadow-lg'>
        <p className='font-bold text-center text-2xl'>{quote}</p>
      </div>
    </>
  )
}

export default Quote
