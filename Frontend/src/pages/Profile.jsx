import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa'
import UserProfileAvatarEdit from '../componets/UserProfileAvatarEdit';
import { FiEdit } from 'react-icons/fi'
import { FaCheckSquare } from 'react-icons/fa'
import toast from 'react-hot-toast'
import SubmitLoader from '../componets/SubmitLoader';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';

const Profile = () => {
    const user = useSelector((state) => state?.user)
    const dispatch = useDispatch()
    const [showEdit, setShowEdit] = useState(false)
    const [loader, setLoader] = useState(false)
    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        mobile: user.mobile
    })

    const [editableFields, setEditableFields] = useState({
        name: false,
        email: false,
        mobile: false,
    })

    const isChanged = () => {
        return (
            userData.name !== user.name ||
            userData.email !== user.email ||
            userData.mobile !== user.mobile
        );
    };


    const toggleEdit = (field) => {
        setEditableFields((prev) => ({
            ...prev,
            [field]: !prev[field],
        }))
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    useEffect(() => {
        setUserData({
            name: user.name,
            email: user.email,
            mobile: user.mobile
        })
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoader(true);
        if (!user.name) toast.error('Name required')
        if (!user.email) toast.error('Email required')

        try {
            const response = await Axios({
                method: SummaryApi.update_user_details.method,
                url: SummaryApi.update_user_details.url,
                data: userData
            })

            const { data: responseData } = response
            if (responseData.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data.data))
                setEditableFields({
                    name: false,
                    email: false,
                    mobile: false
                });

            }
        } catch (error) {
            AxiosToastError(error)
        } finally {

            setLoader(false)
        }
    }

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
                className="mt-2 px-2 py-1 min-w-20 text-sm bg-gray-100 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-200 transition duration-150 cursor-pointer"
            >
                Edit
            </button>
            {showEdit && (
                <UserProfileAvatarEdit onClose={() => setShowEdit(false)} />
            )}

            <form
                className='grid gap-4 my-4'
                onSubmit={handleSubmit}
            >

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
                            type='text'
                            inputMode='numeric'
                            pattern='[0-9]*'
                            maxLength={10}
                            placeholder='Enter your mobile number'
                            className='p-2 pl-3 outline-none flex-grow bg-transparent'
                            value={userData.mobile}
                            name='mobile'
                            onChange={handleOnChange}
                            disabled={!editableFields.mobile}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/\D/g, '');
                            }}
                            required
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

                <button
                    type="submit"
                    disabled={!isChanged()}
                    className={`border px-4 py-2 font-semibold w-80 rounded-lg transition ${isChanged()
                            ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                            : 'border-green-600 text-green-600 bg-white cursor-not-allowed'
                        }`}
                >
                    {loader ? <SubmitLoader /> : "Save"}
                </button>

            </form>

        </div>
    )
}

export default Profile
