import React, { useState } from "react";
import avatar from "../assets/img/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { FaFacebook, FaInstagram, FaEye, FaEyeSlash } from "react-icons/fa";

const Profile = () => {
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

  const [accounts, setAccounts] = useState([
    { id: 1, platform: "Facebook", icon: <FaFacebook />, password: "password123", showPassword: false, strength: "Weak" },
    { id: 2, platform: "Instagram", icon: <FaInstagram />, password: "strongpassword456", showPassword: false, strength: "Strong" },
  ]);

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

  const toggleShowPassword = (id) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { ...account, showPassword: !account.showPassword } : account
    ));
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#0e397e] to-[#75a6a3] pt-24 pb-20">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex bg-white shadow-md rounded-lg p-4 w-11/12 lg:w-8/12 space-x-2">
        {/* Profile Section */}
        <div className="flex flex-col w-full">
          <h4 className="text-4xl font-bold text-center mt-4">Profile</h4>
          <span className="py-2 text-lg text-center text-gray-500">
            You can update your details.
          </span>

          <form className="py-1" onSubmit={handleSubmit}>
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

        {/* List of Accounts Section */}
        <div className="flex flex-col w-full">
          <h4 className="text-3xl font-bold text-center">List of Accounts</h4>
          <div className="mt-4 overflow-auto">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 text-center font-semibold border-b mb-2">
              <span>Platform</span>
              <span>Password</span>
              <span>Show/Hide</span>
              <span>Remarks</span>
            </div>

            {/* Account Items */}
            {accounts.map(account => (
              <div key={account.id} className="grid grid-cols-4 gap-4 items-center border-b py-2">
                <div className="flex items-center justify-center">
                  {account.icon}
                  <span className="ml-2">{account.platform}</span>
                </div>
                <span className="text-center">{account.showPassword ? account.password : "••••••••"}</span>
                <button className="flex justify-center" onClick={() => toggleShowPassword(account.id)}>
                  {account.showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <span className="text-center">{account.strength}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;