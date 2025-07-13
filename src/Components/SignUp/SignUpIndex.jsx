import React from 'react'
import Navigator from '../Navigator/Navigator'
import SignUpPage from './SignUpPage.jsx'

const SignUpIndex = () => {
  return (
    <>
      <div className='w-[100%] h-screen bg-gray-200 flex flex-col'>
        <div>
        <Navigator/>
      </div>
      <div className='flex w-[100%] flex-1 items-center justify-center'>
        <SignUpPage/>
      </div>
      </div>
    </>
  )
}

export default SignUpIndex
