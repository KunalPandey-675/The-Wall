import { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/postStoreList";
import Loader from "./Loader";
const PostList = () => {
  const { postList, loader } = useContext(PostListData);

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
        {!loader && postList.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </>
  );
};

export default PostList;
