import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <img src={logo} alt="logo" className="w-70 h-40" />
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-500 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="text-gray-700 hover:text-blue-500 font-medium transition"
          >
            Courses
          </Link>
          <Link
            to="/login"
            className=" bg-blue-500 text-white rounded-md hover:bg-blue-600 px-3 py-1 font-medium transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
