import React, { useState } from "react";
import { Link } from 'react-router-dom';

function NavBarWorkspace() {
  // State for managing the dropdown visibility
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-900">
      <div className="mx-auto max-w-10xl px-2 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-white text-4xl font-bold">
            FLEXiX
          </Link>
        </div>

        {/* User Profile */}
        <div className="relative">
          <div className="flex items-center" onClick={toggleDropdown}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              className="rounded-full h-10 w-10 object-cover cursor-pointer"
              alt="User Profile"
            />
            <p className="text-white font-semibold py-2 px-4 cursor-pointer">
              John Smith
            </p>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg p-2">
              <Link to="/settings" className="block px-4 py-2 text-gray-800">
                Settings
              </Link>
              <div className="border-t border-gray-200"></div>
              <a href="/logout" className="block px-4 py-2 text-red-600">
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBarWorkspace;
