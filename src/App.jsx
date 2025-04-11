import React from "react";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import PostListProvider from "./store/postStoreList";

function App() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <PostListProvider>
      <div className="appContainer">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="content">
          <Header />
          {activeTab === "Home" ? <div className="postContainer"> <PostList /></div> : <CreatePost />}
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
