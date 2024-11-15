// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Sidebar from "./components/common/Sidebar";
// import OverviewPage from "./pages/OverviewPage";
// import UsersPage from "./pages/UsersPage";
// import AnalyticsPage from "./pages/AnalyticsPage";
// import SettingsPage from "./pages/SettingsPage";
// import Navbar from "./layouts/Navbar";
// import Home from "./components/Home";
// import Menu from "./components/Accounts";
// import About from "./components/About";
// import Footer from "./layouts/Footer";
// import { Toaster } from "react-hot-toast";


// const App = () => {
//   return (
//     <div>
//       <Navbar />

//       <main>
//         <div id="home">
//           <Home />
//         </div>

//         <div id="menu">
//           <Menu />
//         </div>

//         <div id="about">
//           <About />
//         </div>

//       {/* <Sidebar />
// 			<Routes>
// 				<Route path='/' element={<OverviewPage />} />
// 				<Route path='/users' element={<UsersPage />} />
// 				<Route path='/analytics' element={<AnalyticsPage />} />
// 				<Route path='/settings' element={<SettingsPage />} />
// 			</Routes> */}
//       </main>

//       <Footer />
//       <Toaster position="top-right" />
//     </div>


//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// User side
import Navbar from "./layouts/Navbar";
import Home from "./components/Home";
import Menu from "./components/Accounts";
import AccountPage from "./components/Accountpage";
import About from "./components/About";
import Footer from "./layouts/Footer";
import Profile from "./components/Profile";

// Admin side
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import UsersPage from "./pages/UsersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

import { Toaster } from "react-hot-toast";

// User Layout
const UserLayout = ({ children }) => (
  <div>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

// Admin Layout
const AdminLayout = ({ children }) => (
  <div className="admin-layout">
    <Sidebar />
    <div className="admin-content">{children}</div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* User Side Routes */}
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/menu"
          element={
            <UserLayout>
              <Menu />
            </UserLayout>
          }
        />
        <Route
          path="/about"
          element={
            <UserLayout>
              <About />
            </UserLayout>
          }
        />
        <Route
          path="/accountpage"
          element={
            <UserLayout>
              <AccountPage />
            </UserLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <UserLayout>
              <Profile />
            </UserLayout>
          }
        />

        {/* Admin Side Routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <OverviewPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <UsersPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <AdminLayout>
              <AnalyticsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminLayout>
              <SettingsPage />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

