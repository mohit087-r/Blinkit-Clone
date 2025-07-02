import React from 'react';
import { useSelector } from 'react-redux';

const UserProfileAvatarEdit = ({ onClose }) => {
    const user = useSelector((state) => state?.user);

    return (
        <div className="fixed  inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-80 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                >
                    ✕
                </button>

                <h2 className="text-lg font-semibold mb-3 text-center">Change Profile Picture</h2>
                <div className='w-20 h-20 flex items-center mb-4 justify-center shadow-lg rounded-full overflow-hidden mx-auto'>
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
                <form className='w-full'>
                    <label className='border block border-dashed hover:bg-green-50 cursor-pointer border-gray-400 p-4 rounded-md text-center text-sm text-gray-500 w-full' htmlFor='uploadProfile'>
                        Upload
                    </label>
                    <input type='file' id='uploadProfile' className='hidden'/>
                </form>
                {/* Placeholder for file upload */}
                
            </div>
        </div>
    );
};

export default UserProfileAvatarEdit;
