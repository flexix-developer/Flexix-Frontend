import React from "react";
import { Link } from 'react-router-dom';

function NavBarHome() {
  return (
    <nav className="bg-gray-900">
      <div className="mx-auto max-w-10xl px-2 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-white text-4xl font-bold">
            FLEXiX
          </Link>
        </div>

        {/* Sign In Button */}
        <div className="flex items-center">
          <Link to="/login">
            <button className="bg-white hover:bg-gray-100 text-sky-800 font-semibold py-2 px-8 border border-sky-800 rounded shadow">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBarHome;
