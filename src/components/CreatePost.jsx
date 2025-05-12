import { useRef, useState } from "react";
import { useContext } from "react";
import { PostList } from "../store/postStoreList";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const usernameElement = useRef();
  const titleElement = useRef();
  const descElement = useRef();
  const tagsElement = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const userName = usernameElement.current.value;
    const title = titleElement.current.value;
    const desc = descElement.current.value;
    const tags = tagsElement.current.value.split(",");

    usernameElement.current.value = "";
    titleElement.current.value = "";
    descElement.current.value = "";
    tagsElement.current.value = "";
    
    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userName,
        title: title,
        body: desc,
        tags,
        reactions: { likes: 0, dislikes: 0 },
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
        navigate("/");
      });

    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2500);
  };

  return (
    <>
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          Post created successfully!
        </div>
      )}

      <form className="postForm" onSubmit={submitHandler}>
        <div className="mb-2">
          <label htmlFor="userName" className="form-label">
            Enter your Username here
          </label>
          <input
            ref={usernameElement}
            type="text"
            className="form-control"
            id="userName"
            placeholder="Your User ID(Number eg. 1,2,3..)"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="postTitle" className="form-label">
            Post Title
          </label>
          <input
            ref={titleElement}
            type="text"
            className="form-control"
            id="postTitle"
            placeholder="How are u feeling today.."
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="postContent" className="form-label">
            Post Content
          </label>
          <textarea
            ref={descElement}
            rows="3"
            type="text"
            className="form-control"
            id="postContent"
            placeholder="Tell more about it..."
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="postTags" className="form-label">
            Tags
          </label>
          <input
            ref={tagsElement}
            type="text"
            className="form-control"
            id="postTags"
            placeholder="Enter tags separated by commas"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreatePost;
