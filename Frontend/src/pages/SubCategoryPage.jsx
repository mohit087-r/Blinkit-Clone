import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useEffect } from "react";
import Loader from "../componets/Loader";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import NoData from "../componets/noData";
import UploadSubCategoryModel from "../componets/UploadSubCategoryModel";
import DisplayTable from "../componets/DisplayTable";
import { createColumnHelper,  } from '@tanstack/react-table'
import { LuPencil } from "react-icons/lu";
import { MdDelete  } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
const SubCategoryPage = () => {
    const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [loader, setLoader] = useState(false)
    const columnHelper = createColumnHelper()



    const fetchSubCategory = async () => {
        setLoader(true)
        try {
            const response = await Axios({
                url : SummaryApi.get_sub_categories.url,
                method : SummaryApi.get_sub_categories.method
            })

            const { data : responseData} = response
            if(responseData.success){
                setSubCategoryData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        }
        finally{
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchSubCategory()
    }, [])

   

const column = [
    columnHelper.display({
    id: "serial",
    header: "Sr.No",
    cell: ({ row }) => row.index + 1
  }),
    columnHelper.accessor('name',{
      header : "Name"
    }),
    columnHelper.accessor('image',{
      header : "Image",
      cell : ({row})=>{
        console.log("row",)
        return <div className='flex justify-center items-center'>
            <img 
                src={row.original.image}
                alt={row.original.name}
                className='h-10 cursor-pointer'
                onClick={()=>{
                  setImageURL(row.original.image)
                }}      
            />
        </div>
      }
    }),
    columnHelper.accessor("category",{
       header : "Category",
       cell : ({row})=>{
        return(
          <>
            {
              row.original.category.map((c,index)=>{
                return(
                    
                  <span key={c._id+"table"} className='grid mb-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>{c.name}</span>

                )
              })
            }
          </>
        )
       }
    })
  ]
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

            <div>
                <DisplayTable
                    data={subCategoryData}
                    column={column}
                />
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
