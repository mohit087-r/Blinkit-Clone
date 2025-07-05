import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'

const UserSideMenu = () => {
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
    )
}

export default UserSideMenu
