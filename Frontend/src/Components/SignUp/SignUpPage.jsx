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
    const [errorMessage,setErrorMessage]=useState()

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
                sessionStorage.setItem("userId", userId);
                // localStorage.setItem("userId", userId);
                navigate('/commitment')
            }
        } catch (error) {
            // console.log("Error during signup:", error)
            if(error.response.data.statusCode===400){
                setErrorMessage(error.response.data.data)
            }
        }
    }

    const handleNavigate=()=>{
        navigate("/login")
    }

    return (
        <>
            <div className='flex flex-col'>
                <form onSubmit={handleSubmit}>
                <div className='h-fit w-fit bg-gradient-to-r from-blue-50 via-blue-50 to-blue-50 shadow-xl rounded-xl border-gray-400 border-1 px-10 py-5 flex items-center flex-col'>
                    <h1 className='text-center p-4 text-4xl font-bold'>SignUp</h1>
                    <div className='flex flex-col py-2'>
                        <p className='text-left py-1 font-bold'>Enter your email</p>
                        <input type="email" name="email" id="email" onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value })
                        }} className='border-2 bg-white border-gray-400 items-center' />
                    </div>
                    <div className='flex flex-col py-2'>
                        <p className='text-left py-1 font-bold'>Create your password</p>
                        <input type="password" name="password" id="password" onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value })
                        }} className='border-2 bg-white border-gray-400 items-center' />
                    </div>
                    <div className='flex flex-col py-2'>
                        <p className='text-left py-1 font-bold'>Enter your Fullname</p>
                        <input type="text" name="fullname" id="fullname" onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value })
                        }} className='border-2 bg-white border-gray-400 items-center' />
                    </div>
                    <div className='flex flex-col py-2'>
                        <p className='text-left py-1 font-bold'>Create your username</p>
                        <input type="text" name="username" id="username" onChange={(e) => {
                            setFormData({ ...formData, username: e.target.value })
                        }} className='border-2 bg-white border-gray-400 items-center' />
                    </div>
                    <div className='p-2'>
                        <button type="submit" className='font-bold text-xl text-black px-4 py-1 rounded-md hover:transition-transform duration-100 hover:scale-110 hover:text-black'>SignUp</button>
                    </div>
                </div>
            </form>
            <div>
                <p className='text-center mt-4 text-lg font-bold text-red-600'>{errorMessage}</p>
            </div>
            <div className='flex flex-col'>
                <p className='text-sm mt-4 text-center'>Already have an account? </p>
                <button className='font-bold hover:transition-transform duration-100 hover:scale-110 hover:text-black' onClick={handleNavigate}>Login</button>
            </div>
            </div>

        </>
    )
}

export default SignUpPage
