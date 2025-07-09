import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'

const AdminSideMenu = () => {
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
        <nav className="mt-5 pr-3 grid gap-1 text-sm text-neutral-800">
            <Link
                to="/dashboard/profile"
                className={`p-2 rounded-md ${location.pathname === '/dashboard/profile' ? 'bg-blue-300 font-medium' : 'hover:bg-blue-100'
                    }`}
            >
                Profile
            </Link>

            <Link
                to="/dashboard/category"
                className={`p-2 rounded-md ${location.pathname === '/dashboard/category' ? 'bg-blue-300 font-medium' : 'hover:bg-blue-100'
                    }`}
            >
                Category
            </Link>

            <Link
                to="/dashboard/sub-category"
                className={`p-2 rounded-md ${location.pathname === '/dashboard/sub-category' ? 'bg-blue-300 font-medium' : 'hover:bg-blue-100'
                    }`}
            >
                Sub Category
            </Link>

            <Link
                to="/dashboard/upload-product"
                className={`p-2 rounded-md ${location.pathname === '/dashboard/upload-product' ? 'bg-blue-300 font-medium' : 'hover:bg-blue-100'
                    }`}
            >
                Upload Product
            </Link>

            <Link
                to="/dashboard/product"
                className={`p-2 rounded-md ${location.pathname === '/dashboard/product' ? 'bg-blue-300 font-medium' : 'hover:bg-blue-100'
                    }`}
            >
                Product
            </Link>

            

            <button
                onClick={logoutHandler}
                className="text-left hover:bg-red-100 p-2 rounded-md"
            >
                Logout
            </button>
        </nav>
    )
}

export default AdminSideMenu
