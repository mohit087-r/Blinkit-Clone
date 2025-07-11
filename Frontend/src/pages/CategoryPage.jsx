import React, { useState } from "react";
import UploadCategoryModel from "../componets/UploadCategoryModel";
import { FaPlus } from "react-icons/fa6";
import { useEffect } from "react";
import Loader from "../componets/Loader";
import NoData from "../componets/noData";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditCategory from "../componets/EditCategory";
import DeleteCategory from "../componets/DeleteCategory";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [loader, setLoader] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [data, setData] = useState({})
  const [openDelete, setOpenDelete] = useState(false)

  const allCategory = useSelector(state => state.product.allCategory)

  useEffect(() => {
    setCategoryData(allCategory)
  },[categoryData])


  return (
    <section className="sm:py-2 sm:px-4 bg-white">
      <div className="bg-white border border-blue-100 rounded-md px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Category Management
        </h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-blue-400 hover:bg-blue-600 px-4 py-2 rounded-md transition-all shadow-sm"
        >
          <FaPlus size={14} />
          Add Category
        </button>
      </div>

      {!categoryData[0] && !loader && <NoData />}

      {loader && (
        <div className="mt-50">
          <Loader />
        </div>
      )}

      <div className="flex flex-wrap overflow-auto sm:gap-4 mt-2 sm:mt-4">
        {categoryData.map((category, index) => {
          return (
            <div
              key={index}
              className="w-39 h-62 sm:w-42 overflow-hidden rounded-md border text border-blue-100 m-2"
            >

              <div className="flex w-13 justify-self-end justify-between py-1 border-l border-b relative px-2 rounded-bl-lg border-blue-100 top-0 bg-white">
                <button
                  onClick={() => {
                    setData(category)
                    setOpenEdit(true)
                  }}
                  className="text-blue-400 hover:text-blue-500 text-sm"
                >
                  <FiEdit size={15.5} />
                </button>
                <button
                  onClick={() => {
                    setData(category)
                    setOpenDelete(true)
                  }}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
              <img
                src={category.image}
                alt={category.name}
                className="object-scale-down"
              />
            </div>
          );
        })}
      </div>

      {openUploadCategory && (
        <UploadCategoryModel
          // fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {
        openEdit && (
          <EditCategory
            editData={data}
            // fetchData={fetchCategory}
            close={() => setOpenEdit(false)}
          />
        )
      }

      {
        openDelete && (
          <DeleteCategory
            deleteData={data}
            cancle={() => setOpenDelete(false)}
          />
        )
      }
    </section>
  );
};

export default CategoryPage;
