import React from "react";
import Navbar from "./layouts/Navbar";
import Home from "./components/Home";
import Menu from "./components/Accounts";
import About from "./components/About";

import Footer from "./layouts/Footer";

const App = () => {
  return (
    <div>
      <Navbar />

      <main>
        <div id="home">
          <Home />
        </div>

        <div id="menu">
          <Menu />
        </div>

        <div id="about">
          <About />
        </div>

        
      </main>

      <Footer />
    </div>
  );
};

export default App;
