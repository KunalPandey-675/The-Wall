import React, { useEffect } from "react";
import useUserStore from "../store/UserStore";

import MyPostCard from "../components/MyPostCard";
const MyPosts = () => {
  const myPostsFn = useUserStore((state) => state.myPosts);
  const postsLoading = useUserStore((state) => state.postsLoading);
  const userPosts = useUserStore((state) => state.userPosts);
  const error = useUserStore((state) => state.error);

  useEffect(() => {
    myPostsFn();
  }, [myPostsFn]);

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
      <h1 className="mb-4">My Posts</h1>
      {/* <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card border-danger">
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
      </div> */}
      <div className="postList">
        {userPosts && userPosts.length
          ? userPosts.map((post) => (
              <MyPostCard key={post._id} post={post} />
            ))
          : (
            <p className="text-center text-muted">
              You haven't created any posts yet.
            </p>
          )}
      </div>
    </div>
  );
};

export default MyPosts; // Changed from UserPosts to MyPosts
