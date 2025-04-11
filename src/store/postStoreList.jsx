import { useReducer } from "react";
import { createContext } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  removePost: () => {},
});
const postListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;
  if (action.type === "REMOVE_POST") {
    newPostList = currentPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currentPostList];
  }
  return newPostList;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    Dummy_Post_List
  );

  const addPost = (userName, title, desc, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Math.floor(Math.random() * 100),
        userName: userName,
        title: title,
        desc: desc,
        tags: tags,
        reactions: {
          likes: Math.floor(Math.random() * 100),
          views: Math.floor(Math.random() * 100),
        },
      },
    });
  };

  const removePost = (postId) => {
    dispatchPostList({
      type: "REMOVE_POST",
      payload: { postId },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, removePost }}>
      {children}
    </PostList.Provider>
  );
};

const Dummy_Post_List = [
  {
    id: "1",
    userName: "USER_01",
    title: "Learning React",
    desc: "I am learning React and it is awesome!",
    tags: ["React", "JavaScript"],
    reactions: {
      likes: 0,
      views: 10,
    },
  },
  {
    id: "2",
    userName: "USER_02",
    title: "Learning JavaScript",
    desc: "I am learning JavaScript and it is awesome!",
    tags: ["JavaScript"],
    reactions: {
      likes: 2,
      views: 0,
    },
  },
  {
    id: "3",
    userName: "USER_03",
    title: "Learning HTML",
    desc: "I am learning HTML and it is awesome!",
    tags: ["HTML"],
    reactions: {
      likes: 2,
      views: 10,
    },
  },
];
export default PostListProvider;
