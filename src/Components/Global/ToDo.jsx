import React from 'react'
import ColorCylinder from './ColorCylinder'

const ToDo = () => {
    return (
        <>
            <div className='border-2 p-2 w-fit rounded-xl flex gap-5 justify-between items-center'>
                <i></i>
                <div className='flex flex-col'>
                    <span className='text-xl font-bold'>Drink Water</span>
                    <span>4 litre</span>
                </div>
                <ColorCylinder className="bg-yellow-200 text-yellow-900" />
            </div>
        </>
    )
}

export default ToDo
