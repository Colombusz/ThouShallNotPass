import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ViewAccDetails = () => {
  const [selectedApp, setSelectedApp] = useState("Google");
  const [otherAppName, setOtherAppName] = useState("");
  const [description, setDescription] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("userpassword123"); // Example password

  const handleAppChange = (event) => {
    setSelectedApp(event.target.value);
  };

  const handleOtherAppNameChange = (event) => {
    setOtherAppName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleButtonClick = () => {
    // Add your navigation logic here
    console.log("Go to Page button clicked");
  };

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChangePasswordClick = () => {
    // Add your change password logic here
    console.log("Change Password button clicked");
  };

  const appLogos = {
    Google: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    Facebook: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    Instagram: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    Youtube: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
    Tiktok: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
    Other: "https://via.placeholder.com/150", // Placeholder image for other apps
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#0e397e] to-[#75a6a3] pb-8">
      <h1 className="text-4xl font-semibold mb-8">View Account Details</h1>
      <div className="flex w-full max-w-4xl pt-8 flex-col md:flex-row">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full flex flex-col md:flex-row items-center mb-4 md:mb-0">
          <img src={appLogos[selectedApp]} alt={`${selectedApp} logo`} className="w-32 h-32 mb-4 md:mb-0 md:mr-8 object-contain" />
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-700">Select App</label>
            <select className="w-full p-2 mb-4 border rounded-lg" value={selectedApp} onChange={handleAppChange}>
              <option value="Google">Google</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Youtube">Youtube</option>
              <option value="Tiktok">Tiktok</option>
              <option value="Other">Other apps</option>
            </select>
            {selectedApp === "Other" && (
              <div className="w-full mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">App Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter the app name"
                  value={otherAppName}
                  onChange={handleOtherAppNameChange}
                />
              </div>
            )}
            <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
            <input type="text" className="w-full p-2 mb-4 border rounded-lg" placeholder="Enter your username" />
            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              placeholder="Enter a description"
              value={description}
              onChange={handleDescriptionChange}
            />
            <button onClick={handleButtonClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Go To Page</button>
          </div>
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mt-8 flex flex-col">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Existing Password</h2>
        <div className="flex items-center">
          <input
            type={passwordVisible ? "text" : "password"}
            className="w-full p-2 border rounded-lg"
            value={password}
            readOnly
          />
          <button onClick={handlePasswordVisibilityToggle} className="ml-2">
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
          <button onClick={handleChangePasswordClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4">Change Password</button>
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mt-8 flex flex-col">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Password Analysis</h2>
        <div className="w-full">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">ID</th>
                <th className="py-2 px-4 border-b border-gray-200">Entropy</th>
                <th className="py-2 px-4 border-b border-gray-200">Estimated Cracking Time</th>
                <th className="py-2 px-4 border-b border-gray-200">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row, replace with dynamic data */}
              <tr>
                <td className="py-2 px-4 border-b border-gray-200">1</td>
                <td className="py-2 px-4 border-b border-gray-200">45 bits</td>
                <td className="py-2 px-4 border-b border-gray-200">2 years</td>
                <td className="py-2 px-4 border-b border-gray-200">Strong</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAccDetails;