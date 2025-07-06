import React from 'react'
import UserMenu from '../componets/UserMenu'
import { Outlet } from 'react-router-dom'
import SideMenu from '../componets/SideMenu'

const Dashbaord = () => {
    return (
        <section className='bg-white'>
            <div className='container mx-auto p-3 grid lg:grid-cols-[250px_1fr]'>
                {/* left for menu */}
                <div 
                    className='py-4 sticky top-24 max-h-[calc(100vh-170px)] overflow-y-auto hidden lg:block border-r border-gray-300'
                >
                    <SideMenu />
                </div>

                {/* right for menu */}
                <div className='bg-white min-h-[78vh]'>
                    <Outlet />
                </div>
            </div>
        </section>
    )
}

export default Dashbaord
