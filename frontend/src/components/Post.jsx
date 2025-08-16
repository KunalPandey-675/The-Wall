import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import usePostStore from "../store/PostStore";

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isLiking, setIsLiking] = useState(false);
  const likePost = usePostStore((s) => s.likePost);

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      const liked = await likePost(post._id);
      if (liked !== undefined) {
        setIsLiked(liked);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
        <div className="tags">
          {post.tags && post.tags.map((tag, index) => (
            <span key={index} className="badge text-bg-primary me-1">
              {tag}
            </span>
          ))}
        </div>
        <div className="reactions">
          <span 
            className={`badge ${isLiked ? 'text-bg-danger' : 'text-bg-primary'} me-2`}
            style={{ cursor: 'pointer' }}
            onClick={handleLike}
            disabled={isLiking}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            {post.likes || 0}
          </span>
          <span className="badge text-bg-primary">
            <IoMdEye /> {post.views || 0}
          </span>
        </div>
        <div className="bar"></div>
        <p>{post.creatorName}</p>
      </div>
    </div>
  );
};

export default Post;
