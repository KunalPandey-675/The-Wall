import { useEffect } from "react";
import Post from "../components/Post";

import Loader from "../components/Loader";
// import usePostStore from "../store/postStoreList";
import usePostStore from "../store/PostStore";

const PostList = () => {
  // const postList = usePostStore((s) => s.postList);
  // const loader = usePostStore((s) => s.loader);
  const postList = usePostStore((state) => state.posts);
  const loader = usePostStore((state) => state.loading);
  const fetchPost = usePostStore((state) => state.fetchPost);
 useEffect(() => {
   fetchPost();
 }, [fetchPost])
 
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
