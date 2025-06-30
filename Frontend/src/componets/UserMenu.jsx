import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Divider from './Divider';

const UserMenu = () => {
  const user = useSelector((state) => state?.user);

  const userNameOrMobile = user?.name || user?.mobile || 'Guest';

  return (
    <div className="text-gray-700">
      <div className="font-semibold text-xl mb-1">My Account</div>
      <div className="text-sm text-gray-500">{userNameOrMobile}</div>

      <Divider />

      <nav className="mt-5 grid gap-1 text-sm">
        <Link to="/orders" className="hover:bg-gray-100 p-2 rounded-md">
          My Orders
        </Link>
        <Link to="/addresses" className="hover:bg-gray-100 p-2 rounded-md">
          Saved Addresses
        </Link>
        <button className="text-left hover:bg-gray-100 p-2 rounded-md">
          Logout
        </button>
      </nav>
    </div>
  );
};

export default UserMenu;
