import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import PostListProvider from "../store/postStoreList";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <PostListProvider>
      <div className="appContainer">
        <Sidebar/>
        <div className="content">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
