import { useRef, useState } from "react";
import { useContext } from "react";
import { PostList } from "../store/postStoreList";

const CreatePost = () => {
  const {addPost} = useContext(PostList);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const usernameElement = useRef();
  const titleElement = useRef();
  const descElement = useRef();
  const tagsElement = useRef();

  const submitHandler = (e) => {
    e.preventDefault()
    const userName= usernameElement.current.value;
    const title= titleElement.current.value;
    const desc= descElement.current.value;
    const tags= tagsElement.current.value.split(" ");
    
    addPost(userName, title, desc, tags);

    usernameElement.current.value = "";
    titleElement.current.value = "";
    descElement.current.value = "";
    tagsElement.current.value = "";
    
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2500);
  }

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
            placeholder="Your User ID"
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
            placeholder="Enter tags separated by space"
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
