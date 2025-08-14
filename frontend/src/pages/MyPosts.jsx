import React, { useEffect } from "react";
import useUserStore from "../store/UserStore";

const MyPosts = () => {
  const { myPosts, loading, userPosts, error } = useUserStore();
  useEffect(() => {
    myPosts();
  }, [myPosts]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">Loading your posts...</div>
      </div>
    );
  }

  if (error) {
    // Added error handling
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
      <h1 className="mb-4">My Posts</h1>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0">My Posts</h2>
            </div>
            <div className="card-body">
              {userPosts ? (
                <div>
                  {userPosts.map((post, index) => (
                    <div key={index} className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.body}</p>
                        <small className="text-muted">Tags: {post.tags}</small>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted">
                  You haven't created any posts yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPosts; // Changed from UserPosts to MyPosts
