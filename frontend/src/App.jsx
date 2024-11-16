import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Home from "./components/Home";
import Menu from "./components/Accounts";
import AccountPage from "./components/Accountpage";
import About from "./components/About";
import Footer from "./layouts/Footer";
import Profile from "./components/Profile";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/accountpage" element={<AccountPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </Router>
  );
};

export default App;