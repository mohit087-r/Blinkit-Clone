import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa'
import UserProfileAvatarEdit from '../componets/UserProfileAvatarEdit';
const Profile = () => {
    const user = useSelector((state) => state?.user);
    const [showEdit, setShowEdit] = useState(false);
    return (
        <div>
            <div className='w-20 h-20 flex items-center justify-center shadow-lg rounded-full overflow-hidden'>
                {
                    user?.avatar ? (
                        <img src={user.avatar}
                            alt={user.name}
                            className='w-full h-full object-cover'
                        />
                    ) : (
                        <FaRegUserCircle size={65} />
                    )
                }
            </div>
            <button
                onClick={() => setShowEdit(true)}
                className="mt-2 px-2 py-1 min-w-20 text-sm bg-gray-100 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-200 transition duration-150"
            >
                Edit
            </button>
            {showEdit && (
                <UserProfileAvatarEdit onClose={() => setShowEdit(false)} />
            )}
        </div>
    )
}

export default Profile
