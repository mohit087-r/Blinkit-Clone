import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa6";
import uploadImage from '../utils/UploadImage.js';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import SubmitLoader from './SubmitLoader.jsx';
import { useSelector } from 'react-redux';

const UploadSubCategoryModel = ({ close }) => {
    const [data, setData] = useState({ name: "", image: "", category: [] });
    const [loader, setLoader] = useState(false);
    const allCategory = useSelector(state => state.product.allCategory)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    console.log(data.category)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.name || !data.image || !data.category[0]) {
            toast.error("required all feilds")
            return
        }

        setLoader(true)
        try {
            const payload = {
                ...data,
                category: data.category.map(cat => cat._id)
            };

            const response = await Axios({
                method: SummaryApi.add_sub_category.method,
                url: SummaryApi.add_sub_category.url,
                data: payload
            })

            const { data: responseData } = response

            if (responseData.error) {
                toast.error(responseData.message)
                return
            }

            if (responseData.success) {
                toast.success(responseData.message)
                close()
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoader(false);
        }
    };

    const handleUploadSubCategoryImage = async (e) => {
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

    const handleSelectCategory = (e) => {
        const value = e.target.value;
        if (!value) return;

        const categoryDetails = allCategory.find(el => el._id === value);
        if (!categoryDetails) return;

        const alreadySelected = data.category.some(cat => cat._id === categoryDetails._id);
        if (alreadySelected) {
            e.target.value = '';
            return;
        }

        setData(prev => ({
            ...prev,
            category: [...prev.category, categoryDetails]
        }));

        e.target.value = '';
    };


    const handleRemoveCategory = (categoryId) => {
        setData(prev => ({
            ...prev,
            category: prev.category.filter(c => c._id !== categoryId)
        }));
    };


    return (
        <section className="fixed inset-0 mt-20 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="relative bg-white w-full max-w-xl rounded-xl p-6 shadow-lg transition-all animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Add Sub-Category</h2>
                    <button onClick={close} className="text-gray-500 hover:text-red-500 transition">
                        <IoClose size={26} />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col mt-6 space-y-6 max-h-[75vh] overflow-y-auto"
                >
                    {/* Category Name */}
                    <div className="flex flex-col space-y-2 w-full">
                        <label htmlFor="name" className="text-md text-gray-600 font-medium">Sub-Category Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter sub-category name"
                            value={data.name}
                            onChange={handleOnChange}
                            className="w-full border-2 border-gray-200 rounded-md p-2.5 bg-gray-50 focus:outline-none focus:border-blue-400 transition"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col space-y-2 w-full">
                        <label className="text-md text-gray-600 font-medium">Sub-Category Image</label>
                        <div className="relative w-40 h-40 border-gray-400 border-2 border-dashed rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden group transition hover:shadow-md hover:border-blue-400 cursor-pointer">
                            <label htmlFor="image" className={`w-full h-full flex items-center justify-center ${!data.name && "cursor-not-allowed opacity-50"}`}>
                                {data.image ? (
                                    <img
                                        src={data.image}
                                        alt="subCategory"
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
                                onChange={handleUploadSubCategoryImage}
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

                    {/* Select Category Section */}
                    <div className='grid gap-2'>
                        <label htmlFor="categorySelect" className='font-medium text-sm'>Select Category</label>

                        <div className='border-2 border-gray-200 bg-gray-50 rounded-md p-2 space-y-2 focus-within:border-blue-400'>



                            {/* Select input to add new category */}
                            <select
                                id="categorySelect"
                                className='w-full bg-transparent outline-none text-gray-700'
                                onChange={handleSelectCategory}
                            >
                                <option value="" disabled hidden>Select Category</option>
                                {allCategory.map((category) => (
                                    <option
                                        key={category._id + 'subcategory'}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {/* Display selected categories as removable tags */}
                            <div className='flex flex-wrap gap-2'>
                                {data.category.map((cat) => (
                                    <div
                                        key={cat._id + 'selectedValue'}
                                        className='flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'
                                    >
                                        {cat.name}
                                        <button
                                            type='button'
                                            className='text-red-600 hover:text-red-800 font-bold'
                                            onClick={() => handleRemoveCategory(cat._id)}
                                        >
                                            <IoClose />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='mt-4'>
                        <button
                            type="submit"
                            disabled={!data.name || !data.image || !data.category[0] || loader}
                            className={`w-full py-2 rounded-md text-white font-medium transition-all cursor-pointer ${loader
                                ? "bg-blue-400 cursor-wait"
                                : !data.name || !data.image || !data.category[0]
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-400 hover:bg-blue-600"
                                }`}
                        >
                            {loader ? <SubmitLoader /> : "Add Sub-Category"}
                        </button>

                    </div>
                </form>
            </div>
        </section>
    );
};

export default UploadSubCategoryModel;

