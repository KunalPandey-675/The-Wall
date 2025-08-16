import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import usePostStore from "../store/postStoreList";
import useUserStore from "../store/UserStore";
import Loader from "../components/Loader";
import Popup from "../components/PopUp";

function App() {
  const fetchInitialPosts = usePostStore((s) => s.fetchInitialPosts);
  const { checkAuth, loading } = useUserStore();


  const [popup, setPopup] = useState({ show: false, message: "" });

  window.showLoginPopup = (msg = "Please login") => setPopup({ show: true, message: msg });

  useEffect(() => {
    fetchInitialPosts();
    checkAuth();
  }, []);


  if (loading) {
    return <Loader />;
  }

  return (
    <div className="appContainer">
      {/* <div className="left">
        <Sidebar />
      </div> */}
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
