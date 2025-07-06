import React, { useState } from 'react';
import UploadCategoryModel from '../componets/UploadCategoryModel';
import { FaPlus } from 'react-icons/fa6';
import { useEffect } from 'react';
import Loader from '../componets/Loader';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import NoData from '../componets/noData';

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [categoryData, setCategoryData] = useState([])
  const [loader, setLoader] = useState(false)


  const fetchCategory = async () => {
    setLoader(true)
    try {
      const response = await Axios({
        method : SummaryApi.get_categories.method,
        url : SummaryApi.get_categories.url
      })

      const {data : responseData} = response

      if(responseData.success){
        setCategoryData(responseData.data);
      }
      
    } catch (error) {
      AxiosToastError(error)
    }
    finally{
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])


  return (
    <section className="sm:py-2 sm:px-4 bg-white">
      <div className="bg-white border border-blue-100 rounded-md px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl font-semibold text-gray-800">Category Management</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-blue-400 hover:bg-blue-600 px-4 py-2 rounded-md transition-all shadow-sm"
        >
          <FaPlus size={14} />
          Add Category
        </button>
      </div>

      {
        !categoryData[0] && !loader && (
          <NoData/>
        )
      }
      
      {
        loader &&
          <div className='mt-50'>
            <Loader/>
          </div>
      }

      <div className='flex flex-wrap overflow-auto sm:gap-4 mt-2 sm:mt-4'>
  {
    categoryData.map((category, index) => {
      return (
        <div 
          key={index}
          className='w-39 sm:w-42 overflow-hidden rounded-md border text border-blue-100 m-2'
        >
          <img 
            src={category.image}
            alt={category.name} 
            className='object-scale-down'
          />
        </div>
      )
    })
  }
</div>

      

      {openUploadCategory && (
        <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
      )}
    </section>
  );
};

export default CategoryPage;
