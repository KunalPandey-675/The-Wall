import React, { useEffect } from "react";
import useUserStore from "../store/UserStore";
import usePostStore from "../store/PostStore"; // Add this import
import MyPostCard from "../components/MyPostCard";

const MyPosts = () => {
  const myPostsFn = useUserStore((state) => state.myPosts);
  const postsLoading = useUserStore((state) => state.postsLoading);
  const userPosts = useUserStore((state) => state.userPosts);
  const error = useUserStore((state) => state.error);
  
  // Add these for delete popup
  const deleteMessage = usePostStore((state) => state.deleteMessage);
  const clearDeleteMessage = usePostStore((state) => state.clearDeleteMessage);

  useEffect(() => {
    myPostsFn();
  }, [myPostsFn]);

  // Auto-hide delete message after 3 seconds
  useEffect(() => {
    if (deleteMessage) {
      const timer = setTimeout(() => {
        clearDeleteMessage();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteMessage, clearDeleteMessage]);

  if (postsLoading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">Loading your posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Error: {error}</div>
      </div>
    );
  }

  if (!userPosts || userPosts.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          You Have Not Created Any Posts Yet.
        </div>
      </div>
    );
  }

  return (
    <div className="my-posts-page container mt-4">
      {/* Add delete success popup */}
      {deleteMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {deleteMessage}
          <button 
            type="button" 
            className="btn-close" 
            onClick={clearDeleteMessage}
            aria-label="Close"
          ></button>
        </div>
      )}
      
      <h2 className="mb-4 text-center">My Posts</h2>
      <div className="postList">
        {userPosts && userPosts.length ? (
          userPosts.map((post) => <MyPostCard key={post._id} post={post} />)
        ) : (
          <p className="text-center text-muted">
            You haven't created any posts yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
