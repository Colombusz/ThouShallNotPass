import React from "react";
import img1 from "../assets/img/apps/google.png";
import img2 from "../assets/img/apps/fb.png";
import img3 from "../assets/img/apps/ig.png";
import img4 from "../assets/img/apps/tiktok.png";
import img5 from "../assets/img/apps/yt.png";
import img6 from "../assets/img/apps/other apps.png";
import MenuCard from "../layouts/MenuCard";

const Menu = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center lg:flex-row lg:justify-between items-center lg:px-32 px-5 gap-10 bg-gradient-to-r from-[#0e397e] to-[#75a6a3]">
      {/* <h1 className=" font-semibold text-center text-4xl mt-24 mb-8">
        Check Account Password On this Apps
      </h1> */}

      <div className="flex flex-wrap pb-8 gap-8 justify-center mt-24"> {/* Added mt-10 for margin-top */}
        <MenuCard img={img1} title="Google" />
        <MenuCard img={img2} title="Facebook" />
        <MenuCard img={img3} title="Instagram" />
        <MenuCard img={img4} title="Tiktok" />
        <MenuCard img={img5} title="Youtube" />
        <MenuCard img={img6} title="Other Apps" />
      </div>
    </div>
  );
};

export default Menu;