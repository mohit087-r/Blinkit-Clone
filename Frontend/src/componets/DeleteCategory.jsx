import React, { useState } from 'react';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const DeleteCategory = ({ deleteData, fetchData, cancle }) => {
    const [data, setData] = useState({
        categoryId : deleteData._id
    })

    console.log(data)

    const handleCancel = () => {
        cancle()
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios({
                method : SummaryApi.remove_category.method,
                url : SummaryApi.remove_category.url,
                data : data
            })

            const { data : responseData } = response

            if(responseData.error){
                toast.error(responseData.message)
                return
            }

            if(responseData.success){
                toast.success(responseData.message)
                fetchData()
                close()
            }   
        } catch (error) {
            AxiosToastError(error)
        }
    };

    return (
        <section className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="relative bg-white w-full max-w-md rounded-xl px-6 py-4 shadow-lg transition-all animate-fadeIn">

                <p className="text-lg text-neutral-800 font-semibold mb-4 text-center">
                    Are you sure you want to delete this category?
                </p>
                <div className="flex gap-4 justify-between mx-24">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                    >
                        Delete
                    </button>
                </div>

            </div>
        </section>
    );
};

export default DeleteCategory;
