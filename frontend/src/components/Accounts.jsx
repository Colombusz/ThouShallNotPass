import React from "react";
import img1 from "../assets/img/apps/google.png";
import img2 from "../assets/img/apps/fb.png";
import img3 from "../assets/img/apps/ig.png";
import img4 from "../assets/img/apps/tiktok.png";
import img5 from "../assets/img/apps/yt.png";
import img6 from "../assets/img/apps/other apps.png";
import MenuCard from "../layouts/MenuCard";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

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

const Menu = () => {
  const [accounts, setAccounts] = useState([]);  
  const id = getCurrentUser();  


  useEffect(() => {
    const fetchAccounts = async (id) => {
      if (id) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/users/FetchAccount/${id}`);
          console.log("Fetched accounts:", response.data);
          setAccounts(response.data);  
        } catch (error) {
          console.error("Fetch error:", error.response ? error.response.data : error.message);
          toast.error("Failed to fetch accounts. Please try again.");
        }
      }
    };

    fetchAccounts(id);  
  }, [id]); 
  return (
    <div className="min-h-screen flex flex-col justify-center lg:flex-row lg:justify-between items-center lg:px-32 px-5 gap-10 bg-gradient-to-r from-[#0e397e] to-[#75a6a3]">
      {/* <h1 className=" font-semibold text-center text-4xl mt-24 mb-8">
        Check Account Password On this Apps
      </h1> */}

      <div className="flex flex-wrap pb-8 gap-8 justify-center mt-24"> {/* Added mt-10 for margin-top */}
        {accounts.length > 0 ? (
            // Map over the fetched accounts and render MenuCard for each account
            accounts.map((account, index) => (
              <MenuCard key={index} img={account.image || img6} title={account.name} />
            ))
          ) : (
            // If no accounts are fetched, display a message or loading indicator
            <p>No accounts found or loading...</p>
          )}
      </div>
    </div>
  );
};

export default Menu;