import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import { logout } from '../store/userSlice'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'

const UserMenu = ({ close }) => {
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
      </div>

      <Divider />

      <nav className="mt-5 grid gap-1 text-sm">
        <Link to={"/dashboard/profile"} onClick={() => close()} className='hover:bg-blue-100 p-2 rounded-md'>
          Profile
        </Link>
        <Link to={"/dashboard/myorders"} onClick={() => close()} className="hover:bg-blue-100 p-2 rounded-md">
          My Orders
        </Link>
        <Link to={"/dashboard/address"} onClick={() => close()} className="hover:bg-blue-100 p-2 rounded-md">
          Saved Addresses
        </Link>
        <button onClick={logoutHandler} className="text-left hover:bg-red-100 p-2 rounded-md">
          Logout
        </button>
      </nav>
    </div>
  );
};

export default UserMenu;
