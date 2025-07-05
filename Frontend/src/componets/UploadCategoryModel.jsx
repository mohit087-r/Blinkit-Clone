import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa6";
import uploadImage from '../utils/UploadImage.js';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import SubmitLoader from './SubmitLoader.jsx';

const UploadCategoryModel = ({ close }) => {
    const [data, setData] = useState({ name: "", image: "" });
    const [loader, setLoader] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!data.name || !data.image){
            toast.error("required all feilds")
            return
        }

        setLoader(true)
        try {
            const response = await Axios({
                method : SummaryApi.add_category.method,
                url : SummaryApi.add_category.url,
                data : data
            })

            const { data : responseData } = response

            if(responseData.error){
                toast.error(responseData.message)
                return
            }

            if(responseData.success){
                toast.success(responseData.message)
                close()
            }   
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoader(false);
        }
    };

    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoader(true);
        const response = await uploadImage(file);
        const { data: ImageResponse } = response;
        setData(prev => ({ ...prev, image: ImageResponse.data.url }));
        setLoader(false);
    };

    const handleRemoveImage = () => {
        setData(prev => ({ ...prev, image: "" }));
    };

    return (
        <section className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="relative bg-white w-full max-w-md rounded-xl p-6 shadow-lg transition-all animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Add Category</h2>
                    <button onClick={close} className="text-gray-500 hover:text-red-500 transition">
                        <IoClose size={26} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col mt-6 space-y-6">
                    {/* Category Name */}
                    <div className="flex flex-col space-y-2 w-full">
                        <label htmlFor="name" className="text-md text-gray-600 font-medium">Category Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter category name"
                            value={data.name}
                            onChange={handleOnChange}
                            className="w-full border border-gray-200 rounded-md p-2.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col space-y-2 w-full">
                        <label className="text-md text-gray-600 font-medium">Category Image</label>

                        <div className="relative w-40 h-40 border-gray-400 border-2 border-dashed rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden group transition hover:shadow-md hover:border-blue-400 cursor-pointer">

                            <label htmlFor="image" className={`w-full h-full flex items-center justify-center ${!data.name && "cursor-not-allowed opacity-50"}`}>
                                {data.image ? (
                                    <img
                                        src={data.image}
                                        alt="category"
                                        className="w-full h-full object-scale-down rounded-md transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-400 text-sm">
                                        {
                                            loader ? ( 
                                                <span>Uploading...</span>
                                            ) : (
                                                <>
                                                    <FaPlus size={22} />
                                                    <span>Add Image</span>
                                                </>
                                                
                                            )
                                        }
                                    </div>
                                )}
                            </label>

                            <input
                                type="file"
                                id="image"
                                disabled={!data.name || data.image}
                                className="hidden"
                                onChange={handleUploadCategoryImage}
                            />

                            {/* Remove Image Icon */}
                            {data.image && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-1 right-1 bg-white border rounded-full p-1 text-red-500 hover:bg-red-500 hover:text-white transition"
                                >
                                    <FaTrash size={12} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={!data.name || !data.image || loader}
                            className={`w-full py-2 rounded-md text-white font-medium transition-all cursor-pointer ${loader
                                    ? "bg-blue-400 cursor-wait"
                                    : !data.name || !data.image
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {loader ? <SubmitLoader/> : "Add Category"}
                        </button>

                    </div>
                </form>
            </div>
        </section>
    );
};

export default UploadCategoryModel;
