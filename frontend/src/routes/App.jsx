import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../store/UserStore";
import Loader from "../components/Loader";
import Popup from "../components/PopUp";

function App() {
  const { checkAuth, loading, isAuthenticated } = useUserStore();
  const navigate = useNavigate();

  const [popup, setPopup] = useState({ show: false, message: "" });

  window.showLoginPopup = (msg = "Please login") => setPopup({ show: true, message: msg });

  useEffect(() => {
    checkAuth();
  }, []);

  // Handle authentication state changes
  useEffect(() => {
    const currentPath = window.location.pathname;
    // If user logged out and is on a protected route, redirect to home
    if (!isAuthenticated && !loading && (currentPath === '/profile' || currentPath === '/my-posts' || currentPath === '/create-post')) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="appContainer">
      <div className="content">
        <Header />
        <Outlet />
        <Footer />
        {popup.show && (
          <Popup
            message={popup.message}
            onClose={() => setPopup({ show: false, message: "" })}
          />
        )}
      </div>
    </div>
  );
}

export default App;
