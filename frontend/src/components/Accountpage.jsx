import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import zxcvbn from "zxcvbn";
import otherAppsLogo from "../assets/img/apps/other apps.png"; // Adjust the path as necessary

const AccountPage = ({ isVisible, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showExistingPassphrase, setShowExistingPassphrase] = useState(false);
  const [selectedApp, setSelectedApp] = useState("Google");
  const [otherAppName, setOtherAppName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [existingPassphrase, setExistingPassphrase] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [newPasswordStrength, setNewPasswordStrength] = useState(0);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [appLogos, setAppLogos] = useState({
    Google: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    Facebook: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    Instagram: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    Youtube: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
    Tiktok: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
    Other: otherAppsLogo,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleExistingPassphraseVisibility = () => {
    setShowExistingPassphrase(!showExistingPassphrase);
  };

  const handleAppChange = (event) => {
    setSelectedApp(event.target.value);
  };

  const handleOtherAppNameChange = (event) => {
    setOtherAppName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const strength = zxcvbn(newPassword).score;
    setPasswordStrength(strength);
    setIsTyping(true);
  };

  const handleNewPasswordChange = (event) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);
    const strength = zxcvbn(newPassword).score;
    setNewPasswordStrength(strength);
    setIsTyping(true);
  };

  const handleExistingPassphraseChange = (event) => {
    setExistingPassphrase(event.target.value);
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const handleConfirmChangePassword = () => {
    setPassword(newPassword);
    setNewPassword("");
    setIsChangingPassword(false);
    setIsPasswordChanged(true);
  };

  const handleLogoClick = () => {
    document.getElementById("logoUpload").click();
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAppLogos((prevLogos) => ({
          ...prevLogos,
          [selectedApp]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getPasswordStrengthColor = (score) => {
    switch (score) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPasswordSuggestions = (score) => {
    switch (score) {
      case 0:
        return [
          "Use at least 8 characters.",
          "Include both uppercase and lowercase letters.",
          "Add numbers and special characters.",
        ];
      case 1:
        return [
          "Add more unique characters.",
          "Include both uppercase and lowercase letters.",
          "Add numbers and special characters.",
        ];
      case 2:
        return [
          "Add more unique characters.",
          "Include both uppercase and lowercase letters.",
          "Add numbers and special characters.",
        ];
      case 3:
        return [
          "Your password is good, but adding more unique characters can make it stronger.",
          "Include both uppercase and lowercase letters.",
          "Add numbers and special characters.",
        ];
      case 4:
        return ["Your password is strong!"];
      default:
        return [];
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        style={{ zIndex: 100 }}
        onClick={onClose}
      >
        <div
          className="bg-white p-8 rounded-lg w-11/12 lg:w-8/12"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <button className="text-black font-bold text-xl" onClick={onClose}>
              X
            </button>
          </div>
          <div className="flex w-full">
            <div className="w-1/2 mr-4 flex flex-col items-center">
              <img
                src={appLogos[selectedApp]}
                alt={`${selectedApp} logo`}
                className="w-32 h-32 mb-4 object-contain cursor-pointer"
                onClick={handleLogoClick}
              />
              <input
                type="file"
                id="logoUpload"
                style={{ display: "none" }}
                onChange={handleLogoUpload}
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Select App
              </label>
              <select
                className="w-full p-2 mb-4 border rounded-lg"
                value={selectedApp}
                onChange={handleAppChange}
              >
                <option value="Google">Google</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Youtube">Youtube</option>
                <option value="Tiktok">Tiktok</option>
                <option value="Other">Other apps</option>
              </select>
              {selectedApp === "Other" && (
                <div className="w-full mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    App Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter the app name"
                    value={otherAppName}
                    onChange={handleOtherAppNameChange}
                  />
                </div>
              )}
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="w-full p-2 mb-4 border rounded-lg"
                placeholder="Enter your username"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative w-full mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <div
                  className={`h-full ${getPasswordStrengthColor(
                    passwordStrength
                  )}`}
                  style={{ width: `${(passwordStrength + 1) * 20}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-700">
                Password Strength:{" "}
                {["Very Weak", "Weak", "Fair", "Good", "Strong"][
                  passwordStrength
                ]}
              </p>
              {isTyping && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Suggestions:
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {getPasswordSuggestions(passwordStrength).map(
                      (suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded-lg mt-4"
              >
                Create Account
              </button>
            </div>
            <div className="w-1/2 flex flex-col ml-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Existing Passphrase
              </label>
              <div className="relative w-full mb-4">
                <input
                  type={showExistingPassphrase ? "text" : "password"}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter your existing passphrase"
                  value={existingPassphrase}
                  onChange={handleExistingPassphraseChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
                  onClick={toggleExistingPassphraseVisibility}
                >
                  {showExistingPassphrase ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                URL
              </label>
              <input
                type="text"
                className="w-full p-2 mb-4 border rounded-lg"
                placeholder="Enter the URL"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Change Password
              </label>
              <div className="relative w-full mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <div
                  className={`h-full ${getPasswordStrengthColor(
                    newPasswordStrength
                  )}`}
                  style={{ width: `${(newPasswordStrength + 1) * 20}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-700">
                Password Strength:{" "}
                {["Very Weak", "Weak", "Fair", "Good", "Strong"][
                  newPasswordStrength
                ]}
              </p>
              {isTyping && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Suggestions:
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {getPasswordSuggestions(newPasswordStrength).map(
                      (suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded-lg mt-4"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
              {isChangingPassword && (
                <div className="mt-4">
                  <p className="text-sm text-gray-700 mb-2">
                    Are you sure you want to change your password?
                  </p>
                  <button
                    type="button"
                    className="bg-green-500 text-white p-2 rounded-lg mr-2"
                    onClick={handleConfirmChangePassword}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white p-2 rounded-lg"
                    onClick={() => setIsChangingPassword(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
              {isPasswordChanged && (
                <p className="text-sm text-green-500 mt-4">
                  Password has been successfully changed!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;