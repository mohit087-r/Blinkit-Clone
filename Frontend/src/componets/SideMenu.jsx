import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import { logout } from '../store/userSlice'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'

const SideMenu = () => {
  const user = useSelector((state) => state?.user);
  const userNameOrMobile = user?.name || user?.mobile || 'Guest'
  const dispatch = useDispatch()
  const location = useLocation()
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
      </div>

      <Divider />

      <nav className="mt-5 grid gap-1 text-sm">
        <Link
          to="/dashboard/profile"
          className={`p-2 rounded-md ${location.pathname === '/dashboard/profile' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'
            }`}
        >
          Profile
        </Link>

        <Link
          to="/dashboard/myorders"
          className={`p-2 rounded-md ${location.pathname === '/dashboard/myorders' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'
            }`}
        >
          My Orders
        </Link>

        <Link
          to="/dashboard/address"
          className={`p-2 rounded-md ${location.pathname === '/dashboard/address' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'
            }`}
        >
          Saved Addresses
        </Link>

        <button
          onClick={logoutHandler}
          className="text-left hover:bg-red-50 p-2 rounded-md"
        >
          Logout
        </button>
      </nav>

    </div>
  );
};

export default SideMenu;
