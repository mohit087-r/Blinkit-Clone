import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import fetchUserDetails from '../utils/fetchUserDetails';
import { updatedAvatar } from '../store/userSlice';
const UserProfileAvatarEdit = ({ onClose }) => {
    const user = useSelector((state) => state?.user);
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)

    const handleUploadAvatarImage = async (e) => {
        setLoader(true)
        try {
            const file = e.target.files[0]
            if(!file) return
            const formData = new FormData()
            formData.append('avatar', file)
            const response = await Axios({
                method : SummaryApi.upload_avatar.method,
                url : SummaryApi.upload_avatar.url,
                data : formData
            })

            const {data : responseData} = response
            dispatch(updatedAvatar(responseData.data.avatar))
            if(response.data.success){
                toast.success(response.data.message)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoader(false)
        }
    }

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
                        {loader ? 'Loading' : "Upload"}
                    </label>
                    <input 
                        type='file' 
                        id='uploadProfile' 
                        className='hidden'
                        onChange={handleUploadAvatarImage}
                    />
                </form>
            </div>
        </div>
    );
};

export default UserProfileAvatarEdit;
