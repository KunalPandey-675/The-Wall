import Post from "./Post";
import Loader from "./Loader";
import usePostStore from "../store/postStoreList";

const PostList = () => {
  const postList = usePostStore((s) => s.postList);
  const loader = usePostStore((s) => s.loader);

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
