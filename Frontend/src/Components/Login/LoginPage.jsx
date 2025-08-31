import axios from 'axios'
import { set } from 'mongoose'
import React, { useState, UseState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'

const LoginPage = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState()
    const [loader, setLoader] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)

        const apiUrl = import.meta.env.VITE_BACKEND_URL

        try {
            const response = await axios.post(`${apiUrl}/api/users/login`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            })

            if (response.status === 200) {
                const userId = response.data.data.user._id;
                sessionStorage.setItem("userId", userId);
                // localStorage.setItem("userId", userId);
                navigate('/dashboard');
            }
            setLoader(false)

            // console.log(response)

        } catch (error) {
            setLoader(false)
            // console.log("Error during login:", error)
            if (error.response.data.statusCode === 400) {
                setErrorMessage(error.response.data.data)
            }
            // console.log("ERROR",errorMessage)
        }

    }

    const handleNavigate = () => {
        navigate("/signup")
    }


    return (
        <>
            <div className='flex flex-col text-center items-center'>
                {loader && <div className='text-center items-center  my-3 font-semibold'>
                    <p>Our servers are running on free server service which requires a coldstart .</p>
                    <p>We appreciate your patience while the server starts up. This may take a minute.</p></div>}
                <div className='flex flex-col'>
                    <form onSubmit={handleSubmit}>
                        <div className='h-fit w-fit  bg-gradient-to-r from-blue-50 via-blue-50 to-blue-50 shadow-xl border-gray-400 border-1 rounded-xl p-5 flex items-center flex-col'>
                            <h1 className='text-center p-4 text-4xl font-bold'>Login</h1>
                            <div className='flex flex-col py-2'>
                                <p className='text-left py-1 font-bold '>Enter your email</p>
                                <input type="email" name="email" id="email" className='border-2 bg-white border-gray-400 items-center' onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }} />
                            </div>
                            <div className='flex flex-col py-2'>
                                <p className='text-left py-1 font-bold '>Enter your password</p>
                                <input type="password" name="password" id="password" className='border-2 bg-white border-gray-400 items-center' onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} />
                            </div>
                            {!loader && <div className='py-2'>
                                <button type="submit" className='font-bold text-xl text-black px-4 py-1 rounded-md hover:transition-transform duration-100 hover:scale-110 hover:text-black'>Login</button>
                            </div>}
                            {loader && <Loader />}
                        </div>
                    </form>
                    <div>
                        <p className='text-center mt-4 text-lg font-bold text-red-600'>{errorMessage}</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-sm mt-4 text-center  '>Dont have an account? </p>
                        <button className='font-bold hover:transition-transform duration-100 hover:scale-110 hover:text-black' onClick={handleNavigate}>Signup</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginPage
