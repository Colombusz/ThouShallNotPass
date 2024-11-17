import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Paraphrase = ({ show, handleClose }) => {
  const [passphrase, setPassphrase] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const handleChange = (index, event) => {
    const newPassphrase = [...passphrase];
    newPassphrase[index] = event.target.value;
    setPassphrase(newPassphrase);
  };

  const handleConfirm = () => {
    // Handle the passphrase confirmation logic here
    console.log('Passphrase:', passphrase.join(''));
    handleClose();
    navigate('/view-acc-details'); // Update this path to match your route
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Enter Your Passphrase</h2>
          <button onClick={handleClose} className="text-black font-bold text-xl">X</button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Enter Your Passphrase</label>
          <div className="flex justify-between">
            {passphrase.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleChange(index, e)}
                maxLength="20"
                className="w-1/5 p-2 border border-gray-300 rounded text-center"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Close</button>
          <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Paraphrase;