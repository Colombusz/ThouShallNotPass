import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import UsersPage from "./pages/UsersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import Navbar from "./layouts/Navbar";
import Home from "./components/Home";
import Menu from "./components/Accounts";
import About from "./components/About";
import Footer from "./layouts/Footer";
import { Toaster } from "react-hot-toast";


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

      {/* <Sidebar />
			<Routes>
				<Route path='/' element={<OverviewPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path='/analytics' element={<AnalyticsPage />} />
				<Route path='/settings' element={<SettingsPage />} />
			</Routes> */}
      </main>

      <Footer />
      <Toaster position="top-right" />
    </div>


  );
};

export default App;
