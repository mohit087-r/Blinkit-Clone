import React from 'react'
import noDataImage from '../assets/nothing here yet.webp'
const NoData = () => {
    return (
        <div className='grid justify-self-center mt-30'>
            <img 
                src={noDataImage} 
                alt="no data" 
                className='w-36'
            />
            <p className='text-center text-neutral-500 text-xl font-semibold'>No Data</p>
        </div>
    )
}

export default NoData
