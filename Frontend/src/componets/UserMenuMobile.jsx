import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserMenuMobile = () => {
    const user = useSelector((state) => state?.user);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const navigate = useNavigate()
    const redirectToLoginPage = () => {
        navigate("/login")
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsUserMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='lg:hidden'>
            {
                user?._id ? (
                    <button className='text-neutral-600' onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                        <FaRegCircleUser
                            size={23}
                        />
                    </button>
                ) : (
                    <button className='text-neutral-600' onClick={redirectToLoginPage}>
                        <FaRegCircleUser
                            size={23}
                        />
                    </button>
                )
            }

            {
                isUserMenuOpen && (
                    <div className="absolute top-27 right-0 bg-white lg:shadow-lg rounded-lg min-w-[60vw] mx-5 p-4 z-50">
                        <UserMenu close={setIsUserMenuOpen} />
                    </div>
                )
            }

        </div>
    )
}

export default UserMenuMobile
