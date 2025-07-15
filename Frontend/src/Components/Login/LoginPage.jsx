import React from 'react'

const LoginPage = () => {
    return (
        <>
            <div className='h-fit w-fit  bg-gray-100 shadow-xl border-gray-400 border-1 p-5 flex items-center flex-col'>
                <h1 className='text-center p-4 text-xl font-bold'>Login</h1>
                <div className='flex flex-col py-2'>
                    <p className='text-left'>Enter your email</p>
                    <input type="email" name="email" id="email" className='border-2 border-gray-400 items-center' />
                </div>
                <div className='flex flex-col py-2'>
                    <p className='text-left'>Enter your password</p>
                    <input type="password" name="password" id="password" className='border-2 border-gray-400 items-center' />
                </div>
                <div className='py-2'>
                    <button type="submit" className='border-2 border-gray-400 px-4 py-1 hover:bg-gray-700 hover:text-white'>Login</button>
                </div>
            </div>

        </>
    )
}

export default LoginPage
