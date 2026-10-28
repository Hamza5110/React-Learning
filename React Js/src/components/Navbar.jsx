import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <img src={logo} alt="logo" className="w-70 h-40" />
        <div className="flex items-center gap-8">
        {isLoggedIn && (
            <>
              <Link to="/" className="text-gray-700 hover:text-blue-500 font-medium transition">
                Home
              </Link>
              <Link to="/blogs/new" className="text-gray-700 hover:text-blue-500 font-medium transition">
                Create Blog
              </Link>
              <Link to="/courses" className="text-gray-700 hover:text-blue-500 font-medium transition">
                Courses
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white rounded-md hover:bg-red-600 px-3 py-1 font-medium transition"
              >
                Signout
              </button>
            </>
          )}
          {!isLoggedIn && (
            <Link
              to="/login"
              className="bg-blue-500 text-white rounded-md hover:bg-blue-600 px-3 py-1 font-medium transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
