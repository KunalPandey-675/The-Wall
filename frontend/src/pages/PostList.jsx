import { useEffect, useRef } from "react";
import Post from "../components/Post";
import Loader from "../components/Loader";
import usePostStore from "../store/PostStore";
import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "/api";

const PostList = () => {
  const postList = usePostStore((state) => state.posts);
  const loader = usePostStore((state) => state.loading);
  const fetchPost = usePostStore((state) => state.fetchPost);

  // Track which posts have already been incremented
  const incrementedRef = useRef(new Set());

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    if (postList && postList.length > 0) {
      postList.forEach((post) => {
        if (!incrementedRef.current.has(post._id)) {
          axios.patch(`${BASE_URL}/post/increment-view/${post._id}`).catch(() => {});
          incrementedRef.current.add(post._id);
        }
      });
    }
  }, [postList]);

  return (
    <>
      <div className="postList">
        {loader && <Loader />}
        {!loader && postList.length === 0 && (
          <h3
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            There are no post to show!!!
          </h3>
        )}
        {!loader && postList.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </>
  );
};

export default PostList;
