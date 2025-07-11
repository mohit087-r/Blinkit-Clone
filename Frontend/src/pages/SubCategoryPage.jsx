import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useEffect } from "react";
import Loader from "../componets/Loader";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import NoData from "../componets/noData";
import UploadSubCategoryModel from "../componets/UploadSubCategoryModel";

const SubCategoryPage = () => {
    const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [loader, setLoader] = useState(false)

    return (
        <section className="sm:py-0.5 sm:px-4 bg-white">
            <div className="bg-white border border-blue-100 rounded-md px-6 py-4 flex  flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-800 ">
                    Sub-Category Management
                </h2>
                <button
                    onClick={() => setOpenUploadSubCategory(true)}
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-blue-400 hover:bg-blue-600 px-4 py-2 rounded-md transition-all shadow-sm"
                >
                    <FaPlus size={14} />
                    Add Sub-Category
                </button>
            </div>

            {!subCategoryData[0] && !loader && <NoData />}

            {loader && (
                <div className="mt-50">
                    <Loader />
                </div>
            )}


            {openUploadSubCategory && (
                <UploadSubCategoryModel
                    close={() => setOpenUploadSubCategory(false)}
                />
            )}
        </section>
    );
}

export default SubCategoryPage
