import { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/postStoreList";
const PostList = () => {
  const { postList } = useContext(PostListData);
  return (
    <>
      {postList.length === 0 ? (
        <h3>No post to show create one</h3>
      ) : (
        postList.map((post) => (
          <Post key={post.id} post={post} />
        ))
      )}
    </>
  );
};

export default PostList;
