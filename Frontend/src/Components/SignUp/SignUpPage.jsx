import React from 'react'

const SignUpPage = () => {

    const handleSignUp = () =>{
        axios.post('/api/register', {
            
        })
        .then(response => {
            console.log('Sign up successful:', response.data);
        })
        .catch(error =>{
            console.error('There was an error signing up:', error);
        })
    }
    return (
        <>
            <div className='h-fit w-fit  bg-gray-100 shadow-xl border-gray-400 border-1 p-5 flex items-center flex-col'>
                <h1 className='text-center p-4 text-xl font-bold'>SignUp</h1>
                <div className='flex flex-col py-2'>
                    <p className='text-left'>Enter your email</p>
                    <input type="email" name="email" id="email" className='border-2 border-gray-400 items-center' />
                </div>
                <div className='flex flex-col py-2'>
                    <p className='text-left'>Create your password</p>
                    <input type="password" name="password" id="password" className='border-2 border-gray-400 items-center' />
                </div>
                <div className='flex flex-col py-2'>
                    <p className='text-left'>Enter your Fullname</p>
                    <input type="text" name="fullname" id="fullname" className='border-2 border-gray-400 items-center' />
                </div>
                <div className='flex flex-col py-2'>
                    <p className='text-left'>Create your username</p>
                    <input type="text" name="username" id="username" className='border-2 border-gray-400 items-center' />
                </div>
                <div className='py-2'>
                    <button type="submit" onClick={handleSignUp}className='border-2 border-gray-400 px-4 py-1 hover:bg-gray-700 hover:text-white'>Login</button>
                </div>
            </div>

        </>
    )
}

export default SignUpPage
