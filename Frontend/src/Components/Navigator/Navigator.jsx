import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Navigator = () => {

  const [user, setUser] = useState()

  useEffect(() => {
    const getUser = async () => {
      const userId = localStorage.getItem("userId")
      const apiUrl = import.meta.env.VITE_BACKEND_URL

      if (userId) {
        try {
          const resposne = await axios.get(`${apiUrl}/api/users/getuser`, {
            params: { userId }
          })

          if (resposne.status === 200) {
            setUser(resposne.data.data)
          }
        } catch (error) {
          console.log("Error while fetching username", error)
        }
      }
    };getUser()
  },[])
  return (
    <>
      <div className='flex justify-between mb-3 shadow-md box-border w-full py-2 px-6 bg-gray-200'>
        <div>
          <p className='test-font text-4xl'>Rituelle</p>
          <p>{Date().toString}</p>
        </div>
        <div className='flex items-center gap-20'>
          <ul className='flex gap-5 font-bold'>
            {/* <li>Progress</li>
            <li>Gym</li>
            <li>Diet</li> */}
            <li>{user}</li>
          </ul>
          <div className='w-10 h-10 rounded-4xl bg-gray-600'></div>
        </div>
      </div>
    </>
  )
}

export default Navigator
