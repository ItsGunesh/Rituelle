import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navigator = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState()
  const [isOpen, setIsOpen] = useState(false)

  const handleAddHabit=()=>{
      navigate("/api/commitment")
  }

  const handleSignOut=async ()=>{
    const apiUrl = import.meta.env.VITE_BACKEND_URL
    try {
      const response = await axios.post(`${apiUrl}/api/users/logout`,{},{
        headers:{
          "Content-Type": "application/json",
        },
        withCredentials:true
      })


      if(response.status ===200){
        localStorage.removeItem('userId')
        console.log("User Logged out Successfully")
        navigate("/api/login")
      }
    } catch (error) {
      console.log("Error while signing out",error)
    }
  }

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
    }; getUser()
  }, [])
  return (
    <>
      <div className='flex justify-between shadow-md box-border w-full py-2 px-6 bg-gradient-to-r from-slate-100 via-slate-100 to-slate-100'>
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
          <div className='relative'>
            <div className='w-10 h-10 text-3xl hover:transition-transform duration-100 hover:scale-110 hover:text-black' onClick={() => setIsOpen(!isOpen)}><FontAwesomeIcon icon={faBars}/></div>
            {isOpen && (
              <div className='absolute font-bold right-0 mt-2 p-2 w-40 bg-white border rounded-xl shadow-md z-50'>
                <ul className='text-sm'>
                  <li className='px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer' onClick={handleAddHabit}>
                    Add a new habit
                  </li>
                  <li className='px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer' onClick={handleSignOut}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigator
