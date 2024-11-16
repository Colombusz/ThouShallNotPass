import React, { useState } from "react";
import avatar from "../assets/img/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const ProfileContainer = () => {
  const [file, setFile] = useState(); // State for uploaded image
  const [firstName, setFirstName] = useState("Wrath"); // Example existing data
  const [lastName, setLastName] = useState("Boh");
  const [mobile, setMobile] = useState("1234567890");
  const [email, setEmail] = useState("wrathboh@example.com");
  const [address, setAddress] = useState("123 Main St");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordSuggestion, setPasswordSuggestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Dummy form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  const onUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile)); 
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsTyping(true);
    // Simple password strength check
    if (newPassword.length < 6) {
      setPasswordStrength("Weak");
      setPasswordSuggestion("Password should be at least 6 characters long.");
    } else if (newPassword.length < 10) {
      setPasswordStrength("Moderate");
      setPasswordSuggestion("Consider adding more characters to make it stronger.");
    } else {
      setPasswordStrength("Strong");
      setPasswordSuggestion("Your password is strong.");
    }
  };

  return (
    <div className="p-4 w-full space-x-2">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex bg-white shadow-md rounded-lg p-4 w-full space-x-2">
        {/* Profile Section */}
        <div className="flex flex-col w-1/2 items-center">
          <h4 className="text-4xl font-bold text-center mt-4">Profile</h4>
          <span className="py-2 text-lg text-center text-gray-500">
            You can update your details.
          </span>

          <div className="flex justify-center py-4">
            <label htmlFor="profile">
              <img
                src={file || avatar}
                className="w-32 h-32 rounded-full border-2 border-gray-300"
                alt="avatar"
              />
            </label>
            <input onChange={onUpload} type="file" id="profile" name="profile" className="hidden" />
          </div>
        </div>

        {/* Input Fields Section */}
        <div className="flex flex-col w-1/2">
          <form className="py-1" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-4">
              <div className="flex w-full gap-4">
                <input
                  className="border rounded-md p-2 w-full"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="border rounded-md p-2 w-full"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="flex w-full gap-4">
                <input
                  className="border rounded-md p-2 w-full"
                  type="text"
                  placeholder="Mobile No."
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <input
                  className="border rounded-md p-2 w-full"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <input
                className="border rounded-md p-2 w-full"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <div className="flex w-full gap-4 items-center">
                <input
                  className="border rounded-md p-2 w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => setIsTyping(false)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {isTyping && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className={`h-2.5 rounded-full ${passwordStrength === "Weak" ? "bg-red-500" : passwordStrength === "Moderate" ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: passwordStrength === "Weak" ? "33%" : passwordStrength === "Moderate" ? "66%" : "100%" }}></div>
                  </div>
                  <span className="text-gray-500">{passwordSuggestion}</span>
                </>
              )}

              <button className="border-2 border-white bg-[#0c3a6d] text-white hover:text-[#8b98a7] rounded-md p-2 mt-4" type="submit">
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back later?{" "}
                <button className="text-red-500" type="button">
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <ProfileContainer />
  );
};

export default Profile;