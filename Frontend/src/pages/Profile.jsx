import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa'
import UserProfileAvatarEdit from '../componets/UserProfileAvatarEdit';
import { FiEdit } from 'react-icons/fi'
import { MdOutlineSave, MdSave } from 'react-icons/md'
import { FiSave } from 'react-icons/fi'
import { FaCheck } from 'react-icons/fa'
import { MdOutlineCheckCircle } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';  // empty box
import { FaCheckSquare } from 'react-icons/fa';
import { BsCheckSquare } from 'react-icons/bs';
import { MdCheckBox } from 'react-icons/md';

const Profile = () => {
    const user = useSelector((state) => state?.user);
    const [showEdit, setShowEdit] = useState(false);
    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        mobile: user.mobile
    })

    const [editableFields, setEditableFields] = useState({
        name: false,
        email: false,
        mobile: false,
    });

    const toggleEdit = (field) => {
        setEditableFields((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    };

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

            <form className='my-4 space-y-4'>

                {/* Name */}
                <div className='grid'>
                    <label className='flex justify-between items-center'>
                        Name
                    </label>

                    <div className='flex items-center rounded bg-blue-50 border border-blue-50 focus-within:border-amber-200 max-w-80'>
                        <input
                            type='text'
                            placeholder='Enter your name'
                            className='p-2 pl-3 outline-none flex-grow bg-transparent'
                            value={userData.name}
                            name='name'
                            onChange={handleOnChange}
                            disabled={!editableFields.name}
                        />
                        <button
                            type='button'
                            className='text-gray-500 text-lg px-3 border-l border-gray-300 cursor-pointer'
                            onClick={() => toggleEdit('name')}
                        >
                            {editableFields.name ? <FaCheckSquare className='hover:text-green-600' /> : <FiEdit className='hover:text-amber-500 transition' />}
                        </button>
                    </div>
                </div>

                {/* Email */}
                <div className='grid'>
                    <label className='flex justify-between items-center'>
                        Email
                    </label>

                    <div className='flex items-center rounded bg-blue-50 border border-blue-50 focus-within:border-amber-200 max-w-80'>
                        <input
                            type='text'
                            placeholder='Enter your email'
                            className='p-2 pl-3 outline-none flex-grow bg-transparent'
                            value={userData.email}
                            name='email'
                            onChange={handleOnChange}
                            disabled={!editableFields.email}
                        />
                        <button
                            type='button'
                            className='text-gray-500 text-lg px-3 border-l border-gray-300 cursor-pointer'
                            onClick={() => toggleEdit('email')}
                        >
                            {editableFields.email ? <FaCheckSquare className='hover:text-green-600' /> : <FiEdit className='hover:text-amber-500 transition' />}
                        </button>
                    </div>
                </div>


                {/* Mobile */}
                <div className='grid'>
                    <label className='flex justify-between items-center'>
                        <span>Mobile No</span>
                    </label>

                    <div className='flex items-center rounded bg-blue-50 border border-blue-50 focus-within:border-amber-200 max-w-80'>
                        <input
                            type='number'
                            placeholder='Enter your mobile number'
                            className='p-2 pl-3 outline-none flex-grow bg-transparent'
                            value={userData.mobile}
                            name='mobile'
                            onChange={handleOnChange}
                            disabled={!editableFields.mobile}
                        />
                        <button
                            type='button'
                            className='text-gray-500 text-lg px-3 border-l border-gray-300 cursor-pointer'
                            onClick={() => toggleEdit('mobile')}
                        >
                            {editableFields.mobile ? <FaCheckSquare className='hover:text-green-600' /> : <FiEdit className='hover:text-amber-500 transition' />}
                        </button>
                    </div>
                </div>



            </form>

        </div>
    )
}

export default Profile
