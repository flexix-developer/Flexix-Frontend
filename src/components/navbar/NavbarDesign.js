import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import axios from "axios";

function NavBarDesign({
  fname,
  lname,
  isWorkspace,
  handleEyeIconClick,
  activepage,
}) {
  // State for managing the dropdown visibility
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    localStorage.clear();
  };

  const handleCodeIconClick = async () => {
    const ID = localStorage.getItem("ID");
    const ProjectID = localStorage.getItem("ProjectID");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        // "http://127.0.0.1:8081/users/preview",
        "http://ceproject.thddns.net:3322/users/preview",
        {
          id: ID,
          proid: ProjectID,
          pagename: activepage.slice(0, -5),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.url);
      window.open(response.data.url, "_blank"); // เพิ่มบรรทัดนี้
    } catch (error) {
      alert("Create New Page Failed!");
    }
  };

  return (
    <nav className="bg-gray-900">
      <div className="mx-auto max-w-10xl px-2 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to={isWorkspace ? "/workspace" : "/"}
            className="text-white text-4xl font-bold"
          >
            FLEXiX
          </Link>
        </div>
        {isWorkspace && (
          <div className="flex flex-row ml-5">
            {/* <div className="mx-5 cursor-pointer" onClick={handleEyeIconClick}> */}
            <div className="mx-5 cursor-pointer">
              <IoEyeOutline
                color="white"
                size={30}
                onClick={handleCodeIconClick}
              />
            </div>
            {/* <div className="cursor-pointer" onClick={handleCodeIconClick}> */}
            <div className="cursor-pointer" onClick={handleEyeIconClick}>
              <FaCode color="white" size={30} />
            </div>
          </div>
        )}

        {/* User Profile */}
        <div className="relative">
          <div className="flex items-center" onClick={toggleDropdown}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              className="rounded-full h-10 w-10 object-cover cursor-pointer"
              alt="User Profile"
            />
            <p className="text-white font-semibold py-2 px-4 cursor-pointer">
              {fname} {lname}
            </p>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg p-2">
              <Link to="/settings" className="block px-4 py-2 text-gray-800">
                Settings
              </Link>
              <div className="border-t border-gray-200"></div>
              <a
                href="/login"
                className="block px-4 py-2 text-red-600"
                onClick={logout}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBarDesign;
