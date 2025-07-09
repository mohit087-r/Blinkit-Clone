import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import { logout } from '../store/userSlice'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'

const AdminMenu = ({ close }) => {
  const user = useSelector((state) => state?.user)
  const userNameOrMobile = user?.name || user?.mobile || 'Guest'
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const response = await Axios({
        method: SummaryApi.logout.method,
        url: SummaryApi.logout.url
      })

      if (response.data.error) {
        toast.error(response.data.message)
        return
      }

      if (response.data.success) {
        dispatch(logout())
        localStorage.clear()
        close()
        toast.success(response.data.message)
        navigate('/login')
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <div className="text-gray-700 pl-2">
      <div className="font-semibold text-xl mb-1">My Account</div>
      <div className="text-sm text-gray-500 flex items-center gap-1">
        {userNameOrMobile} 
        <span className='text-red-500 text-xs'>&#40;Admin&#41;</span>
      </div>

      <Divider />

      <nav className="mt-5 grid gap-1 text-sm">
        <Link to={"/dashboard/profile"} onClick={() => close()} className='hover:bg-blue-100 p-2 rounded-md'>
          Profile
        </Link>
        <Link to={"/dashboard/category"} onClick={() => close()} className="hover:bg-blue-100 p-2 rounded-md">
          Category
        </Link>
        <Link to={"/dashboard/sub-category"} onClick={() => close()} className="hover:bg-blue-100 p-2 rounded-md">
          Sub Category
        </Link>
        <Link to={"/dashboard/upload-product"} onClick={() => close()} className="hover:bg-blue-100 p-2 rounded-md">
          Upload Product
        </Link>
        <Link to={"/dashboard/product"} onClick={() => close()} className="hover:bg-blue-100 p-2 rounded-md">
          Product
        </Link>
        <button onClick={logoutHandler} className="text-left hover:bg-red-100 p-2 rounded-md">
          Logout
        </button>
      </nav>
    </div>
  );
};


export default AdminMenu