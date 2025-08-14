import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import usePostStore from "../store/postStoreList";
import useUserStore from "../store/UserStore";
import Loader from "../components/Loader";

function App() {
  const fetchInitialPosts = usePostStore((s) => s.fetchInitialPosts);
  const { checkAuth, loading } = useUserStore();

  useEffect(() => {
    fetchInitialPosts();
    checkAuth();
    // fetch only once on mount to avoid update loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show loader during initial auth check
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
      </div>
    </div>
  );
}

export default App;
