import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { FaTrash } from "react-icons/fa"; // Import trash icon
import Login from "../components/Login";
import Paraphrase from "../components/users/Paraphrase"; // Corrected import path

const MenuCard = (props) => {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showParaphraseModal, setShowParaphraseModal] = useState(false); // State for Paraphrase modal
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleCheckPasswordStrength = () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      setShowLoginPrompt(true);
    } else {
      // Show Paraphrase modal if user is logged in
      setShowParaphraseModal(true);
    }
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    setShowLoginPrompt(false);
  };

  const handleRemoveCard = () => {
    // Logic to remove the card
    if (props.onRemove) {
      props.onRemove(props.id);
    }
  };

  return (
    <div className="w-full lg:w-1/4 bg-white p-3 rounded-lg pt-5 mt-5"> {/* Added mt-5 for margin-top */}
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
              View Account Details
            </button>
          </div>
          <button
            className="text-red-500 hover:text-red-700 transition-all"
            onClick={handleRemoveCard}
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Modal for Paraphrase */}
      <Paraphrase show={showParaphraseModal} handleClose={() => setShowParaphraseModal(false)} />

      {/* Modal for Login Prompt */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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