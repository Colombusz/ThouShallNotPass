import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-hot-toast";
import logo from "../assets/img/logo.png"; // Ensure this path is correct
import profilePic from "../assets/img/profile.png"; // Adjust this path to your actual profile image
import Button from "./Button";
import Login from "../components/Login";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  return (
    <div className="fixed w-full z-10">
      <div className="flex flex-row justify-between p-5 lg:px-32 px-5 bg-gradient-to-r from-[#0e397e] to-[#75a6a3]">
        <div className="flex flex-row items-center cursor-pointer gap-2">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <h1 className="text-3xl font-semibold text-white">Lockify</h1>
        </div>

        <nav className="hidden md:flex flex-row items-center text-2xl font-bold gap-8 text-white">
          <RouterLink
            to="/"
            className="group relative inline-block cursor-pointer hover:text-[#a7f7ff]"
            onClick={closeMenu}
          >
            Home
          </RouterLink>

          
          {isLoggedIn ? (
            <RouterLink
              to="/menu"
              className="group relative inline-block cursor-pointer hover:text-[#a7f7ff]"
              onClick={closeMenu}
            >
              Accounts
            </RouterLink>
          ) : null}


          
          <RouterLink
            to="/about"
            className="group relative inline-block cursor-pointer hover:text-[#a7f7ff]"
            onClick={closeMenu}
          >
            About Us
          </RouterLink>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* Profile Picture with Dropdown */}
              <div className="relative">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="h-11 w-11 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                    <RouterLink
                      to="/profile"
                      className="block px-4 py-2 text-black hover:bg-gray-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      View Profile
                    </RouterLink>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Button title="Login" onClick={toggleLoginModal} />
          )}
        </div>

        <div className="md:hidden flex items-center">
          {menu ? (
            <AiOutlineClose size={25} onClick={handleChange} />
          ) : (
            <AiOutlineMenuUnfold size={25} onClick={handleChange} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          menu ? "translate-x-0" : "-translate-x-full"
        } lg:hidden flex flex-col absolute bg-black text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
      >
        <RouterLink
          to="/"
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          Home
        </RouterLink>
        <RouterLink
          to="/menu"
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          Menu
        </RouterLink>
        <RouterLink
          to="/about"
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          About Us
        </RouterLink>
        {isLoggedIn ? (
          <button
            className="text-white bg-red-500 px-4 py-2 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="text-white bg-green-500 px-4 py-2 rounded-md"
            onClick={toggleLoginModal}
          >
            Login
          </button>
        )}
      </div>

      {/* Modal for Login */}
      {showLoginModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          style={{ zIndex: 100 }}
        >
          <div className="bg-white p-8 rounded-lg">
            <button
              className="text-black font-bold text-xl mb-4"
              onClick={toggleLoginModal}
            >
              X
            </button>
            <Login onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
