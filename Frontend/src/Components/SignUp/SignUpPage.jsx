import React , {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        username: ""
    })

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_BACKEND_URL

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${apiUrl}/api/users/signup`, formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials:true
                }

            )

            if (response.status === 201) {
                console.log("User registered and LoggedIn successfully:", response.data)
                const userId = response.data.data.user._id;
                localStorage.setItem("userId", userId);
                navigate('/api/commitment')
            }
        } catch (error) {
            console.log("Error during signup:", error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='h-fit w-fit bg-gray-100 shadow-xl rounded-xl border-gray-400 border-1 px-10 py-5 flex items-center flex-col'>
                    <h1 className='text-center p-4 text-4xl font-bold'>SignUp</h1>
                    <div className='flex flex-col py-2'>
                        <p className='text-left py-1'>Enter your email</p>
                        <input type="email" name="email" id="email" onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value })
                        }} className='border-2 border-gray-400 items-center' />
                    </div>
                    <div className='flex flex-col py-2'>
                        <p className='text-left py-1'>Create your password</p>
                        <input type="password" name="password" id="password" onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value })
                        }} className='border-2 border-gray-400 items-center' />
                    </div>
                    <div className='flex flex-col py-2'>
                        <p className='text-left py-1'>Enter your Fullname</p>
                        <input type="text" name="fullname" id="fullname" onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value })
                        }} className='border-2 border-gray-400 items-center' />
                    </div>
                    <div className='flex flex-col py-2'>
                        <p className='text-left py-1'>Create your username</p>
                        <input type="text" name="username" id="username" onChange={(e) => {
                            setFormData({ ...formData, username: e.target.value })
                        }} className='border-2 border-gray-400 items-center' />
                    </div>
                    <div className='py-2'>
                        <button type="submit" className='border-2 rounded-lg border-gray-400 px-5 py-1 hover:bg-gray-700 hover:text-white'>SignUp</button>
                    </div>
                </div>
            </form>

        </>
    )
}

export default SignUpPage
