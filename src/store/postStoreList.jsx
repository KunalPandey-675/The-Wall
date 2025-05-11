import { useReducer,useState, useEffect } from "react";
import { createContext } from "react";

export const PostList = createContext({
  loader: false,
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
  removePost: () => {},
});

const postListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;
  if (action.type === "REMOVE_POST") {
    newPostList = currentPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currentPostList];
  }
  return newPostList;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    []
  );

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const removePost = (postId) => {
    dispatchPostList({
      type: "REMOVE_POST",
      payload: { postId },
    });
  };  
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch("https://dummyjson.com/posts?limit=14")
      .then((res) => res.json())
      .then((res) => {
        addInitialPosts(res.posts);
        setLoader(false);
      });
  }, []);

  return (
    <PostList.Provider
      value={{ postList, addPost, loader, removePost }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
