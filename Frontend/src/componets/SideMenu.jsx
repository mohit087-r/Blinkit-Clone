import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Divider from './Divider'

import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import UserSideMenu from './UserSideMenu'
import AdminSideMenu from './AdminSideMenu'

const SideMenu = () => {
  const user = useSelector((state) => state?.user);
  const userNameOrMobile = user?.name || user?.mobile || 'Guest'
  
  

  return (
    <div className="text-gray-700 pl-2">
      <div className="font-semibold text-xl mb-1">My Account</div>
      <div className="text-sm text-gray-500 flex items-center gap-1">
        {userNameOrMobile}
        {
          user?.role === 'ADMIN' ?
          <span className='text-red-500 text-xs'>&#40;Admin&#41;</span> 
          : <></>
        }
      </div>

      <Divider />
      {
        user?.role === 'ADMIN' ? <AdminSideMenu/> : <UserSideMenu/>
      }
    </div>
  );
};

export default SideMenu;
