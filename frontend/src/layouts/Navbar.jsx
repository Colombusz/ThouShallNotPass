import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import logo from '../assets/img/logo.png';
import Button from "./Button";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import Login from "../components/Login";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
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
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="group relative inline-block cursor-pointer hover:text-[#a7f7ff]"
          >
            Home
          </Link>
          <Link
            to="menu"
            spy={true}
            smooth={true}
            duration={500}
            className="group relative inline-block cursor-pointer hover:text-[#a7f7ff]"
          >
            Accounts
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="group relative inline-block cursor-pointer hover:text-[#a7f7ff]"
          >
            About Us
          </Link>
        </nav>

        <div className="hidden lg:flex">
          {isLoggedIn ? (
            <Button title="Logout" onClick={handleLogout} />
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
        <Link
          to="home"
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          to="menu"
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          Menu
        </Link>
        <Link
          to="about"
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-brightColor transition-all cursor-pointer"
          onClick={closeMenu}
        >
          About Us
        </Link>
        {isLoggedIn ? (
          <Button title="Logout" onClick={handleLogout} />
        ) : (
          <Button title="Login" onClick={toggleLoginModal} />
        )}
      </div>

      {/* Modal for Login */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" style={{ zIndex: 100 }}>
          <div className="bg-white p-8 rounded-lg">
            <button
              className="text-black font-bold text-xl mb-4"
              onClick={toggleLoginModal}
            >
              X
            </button>
            <Login onLoginSuccess={handleLoginSuccess} /> {/* Pass the callback */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;