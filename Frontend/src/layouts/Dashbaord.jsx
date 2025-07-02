import React from 'react'
import UserMenu from '../componets/UserMenu'
import { Outlet } from 'react-router-dom'

const Dashbaord = () => {
    return (
        <section className='bg-white s'>
            <div className='container mx-auto p-3 grid lg:grid-cols-[250px_1fr]'>
                {/* left for menu */}
                <div className='py-4 sticky top-24 overflow-y-auto hidden lg:block'>
                    <UserMenu/>
                </div>
                    
                {/* right for menu */}
                <div className='bg-white p-4'>
                    <Outlet/>
                </div>
            </div>
        </section>
    )
}

export default Dashbaord
