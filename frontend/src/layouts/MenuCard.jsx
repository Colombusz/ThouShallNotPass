

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Login from "../components/Login";

const MenuCard = (props) => {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCheckPasswordStrength = () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      setShowLoginPrompt(true);
    } else {
      // Proceed with the password strength check
      toast.success("Proceeding with password strength check...");
    }
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    setShowLoginPrompt(false);
  };

  return (
    <div className="w-full lg:w-1/4 bg-white p-3 rounded-lg">
      <div>
        <img className="rounded-xl" src={props.img} alt="img1" />
      </div>
      <div className="p-2 mt-5">
        <div className="flex flex-row justify-between">
          <h3 className="font-semibold text-xl">{props.title}</h3>
          <h3 className="font-semibold text-xl">{props.value}</h3>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <div className="flex gap-2">
            <button
              className="px-6 py-1 border-2 border-[#212071] bg-[#a2b6e5] hover:text-[#4e66b6] transition-all rounded-full"
              onClick={handleCheckPasswordStrength}
            >
              CHECK PASSWORD STRENGTH
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Login Prompt */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" style={{ zIndex: 100 }}>
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl mb-4">You need to log in to check password strength.</h2>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg"
              onClick={toggleLoginModal}
            >
              Sign In
            </button>
          </div>
        </div>
      )}

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
            <Login onLoginSuccess={toggleLoginModal} /> {/* Pass the callback */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuCard;