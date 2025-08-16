import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useUserStore from "../store/UserStore";

const CreatePost = () => {
  const { createPost, error, user } = useUserStore();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const titleElement = useRef();
  const descElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createPost(
      {
        title: titleElement.current.value,
        body: descElement.current.value,
        tags: tagsElement.current.value,
      },
      navigate
    );
    titleElement.current.value = "";
    descElement.current.value = "";
    tagsElement.current.value = "";
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

      <form className="postForm" onSubmit={handleSubmit}>
        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "12px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {error}
          </div>
        )}
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