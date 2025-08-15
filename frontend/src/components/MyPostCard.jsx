import { FaHeart } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";

const MyPostCard = ({ post }) => {
  // const removePost = usePostStore((s) => s.removePost);
  return (
    <div className="card" style={{ width: "18rem"}}>
      <div className="card-body">
        <h5 className="card-title">{post.title} </h5>
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          onClick={() => removePost(post.id)}
        >
          <IoTrashBin />
        </span>
        <p className="card-text">{post.body}</p>
        <div className="tags">
          {post.tags && post.tags.map((tag) => (
            <span key={tag} className="badge text-bg-primary">
              {tag}
            </span>
          ))}
        </div>
        <div className="reactions">
          <span className="badge text-bg-primary">
            <FaHeart /> 
            {post.reactions ? post.reactions.likes : 0}
          </span>
          <span className="badge text-bg-primary">
            <IoMdEye /> {post.reactions ? post.reactions.dislikes : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyPostCard;
