import { FaHeart } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import usePostStore from "../store/PostStore";

const MyPostCard = ({ post }) => {
  const removePost = usePostStore((s) => s.removePost);
  
  return (
    <div className="card" style={{ width: "18rem"}}>
      <div className="card-body">
        <h5 className="card-title">{post.title} </h5>
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          onClick={() => removePost(post._id)}
          style={{ cursor: 'pointer' }}
        >
          <IoTrashBin />
        </span>
        <p className="card-text">{post.body}</p>
        <div className="tags">
          {post.tags && post.tags.map((tag, index) => (
            <span key={index} className="badge text-bg-primary me-1">
              {tag}
            </span>
          ))}
        </div>
        <div className="reactions">
          <span className="badge text-bg-primary me-2">
            <FaHeart /> 
            {post.likes || 0}
          </span>
          <span className="badge text-bg-primary">
            <IoMdEye /> {post.views || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyPostCard;
