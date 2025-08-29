import React from 'react'
import Navigator from "../Components/Navigator/Navigator.jsx"
import GymNav from './GymNav/GymNav.jsx'
import MuscleGroupBox from './Exercises/MuscleGroupBox.jsx'
import MainIndex from './Main/MainIndex.jsx'

const GymDashboard = () => {
    return (
        <>
            <div className='bg-gradient-to-br from-slate-100 to-slate-200 h-full'>
                <Navigator />
                <div className='mx-5'>
                    <GymNav />
                </div>
                <div className='sm:mx-15 md:mx-5 flex responsive-flex'>
                    <MuscleGroupBox/>
                    <MainIndex/>
                </div>
            </div>
        </>
    )
}

export default GymDashboard
