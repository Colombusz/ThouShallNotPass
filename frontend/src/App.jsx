import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
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

// ProtectedRoute Component
const ProtectedRoute = ({ children, role }) => {
  const userRole = sessionStorage.getItem("role");

  // Redirect if role does not match
  if (!userRole || userRole !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};

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
            <ProtectedRoute role="admin">
              <AdminLayout>
                <OverviewPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <UsersPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AnalyticsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <SettingsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
