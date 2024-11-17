import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import otherAppsLogo from "../assets/img/apps/other apps.png"; // Adjust the path as necessary
import axios from "axios";
const AccountPage = ({ isVisible, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedApp, setSelectedApp] = useState("Google");
  const [otherAppName, setOtherAppName] = useState("");
  const [password, setPassword] = useState("");
  const [appLogos, setAppLogos] = useState({
    Google: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    Facebook: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    Instagram: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    Youtube: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
    TikTok: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
    Other: otherAppsLogo,
  });

   // Get the current user ID
   const getCurrentUser = () => {
    const token = sessionStorage.getItem("accessToken");
  
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      const userId = decodedToken?.user_id;  
      console.log("Logged in user ID:", userId);
      return userId;
    } else {
      console.log("No user is logged in.");
      return null;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

  const createAccount = async (formData) => {
    const id = getCurrentUser();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/users/CreateAccount/${id}`,{
        method: "POST",
        body: formData, // Pass FormData directly
      });
  
      if (!response.ok) {
        console.log(response.data)
      }
  
      const data = await response.data;
      console.log("Account created successfully:", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const fileInput = event.target.image; 
    let image_file = null;
    if (fileInput && fileInput.files.length > 0) {
      image_file = fileInput.files[0];
    }
    const formData = {
      name: selectedApp === "Other" ? otherAppName : selectedApp,
      username: event.target.username.value,
      description: event.target.description.value,
      url: event.target.url.value,
      password: password,
      image: image_file,
    };
    console.log("Form submitted with data:", formData);
    createAccount(formData);
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
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <img
              src={appLogos[selectedApp]}
              alt={`${selectedApp} logo`}
              className="w-32 h-32 mb-4 object-contain cursor-pointer"
              onClick={handleLogoClick}
            />
            <input
              type="file"
              id="logoUpload"
              name="image"
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
               name = "name"
            >
              <option name = "name" value="Google">Google</option>
              <option name = "name" value="Facebook">Facebook</option>
              <option name = "name" value="Instagram">Instagram</option>
              <option name = "name" value="Youtube">Youtube</option>
              <option name = "name" value="TikTok">TikTok</option>
              <option name = "name" value="Other">Other apps</option>
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
                  name = "name"
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
              name = "username"
            />
             <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded-lg"
              placeholder="Enter your username"
              name = "description"
            />
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Url
            </label>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded-lg"
              placeholder="Enter the page's url"
              name = "url"
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
                name = "password"
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
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg mt-4"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
