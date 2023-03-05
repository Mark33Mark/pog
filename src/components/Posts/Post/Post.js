import React from "react";
import { useDispatch } from "react-redux";
import { likePost, deletePost } from "../../../store/postsSlice";
import DefaultImage from "../../../assets/images/picture-default.svg";
import DeleteWasteBin from "../../../assets/icons/DeleteWasteBin";
import MenuSelector from "../../../assets/icons/MenuSelector";
import LikeSolid from "../../../assets/icons/LikeSolid";
import moment from "moment";
import "./Post.css";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <div className="card" id={post._id}>
      <div className="media" title={post.title}>
        <span>
          <img src={post.selectedFile || DefaultImage} alt="post" />
        </span>
      </div>

      <div className="overlay-post-summary">
        <div>{post.creator}</div>
        <div>{moment(post.createdAt).fromNow()}</div>
      </div>

      <div className="overlay-edit-button">
        <button
          className="button-reset"
          title="click here to edit this post"
          onClick={() => setCurrentId(post._id)}
        >
          <MenuSelector class="menu-selector-icon" fill="none" />
        </button>
      </div>

      <div className="hash-tags">
        { post.tags ? 
          post.tags.map((tag, i) => (
          <span className="post-tags" key={i}>
            #{tag}
          </span>
        ))
        : null}
      </div>

      <h2 className="title">{post.title}</h2>

      <div className="message-container">
        <p className="message-post">{post.message}</p>
      </div>

      <div className="cardActions">
        <button
          className="button-like"
          onClick={() => dispatch(likePost(post._id))}
          title="click here to like this post"
        >
          <LikeSolid
            class="like-icon"
            width="2em"
            height="2em"
            fill="#3f51b5"
          />
          like {post.likeCount}
        </button>
        <button
          className="button-waste-bin"
          onClick={() => dispatch(deletePost(post._id))}
          title="click to delete this post"
        >
          {" "}
          <DeleteWasteBin
            class="bin-icon"
            width="2em"
            height="2em"
            fill="#3f51b5"
          />{" "}
          delete{" "}
        </button>
      </div>
    </div>
  );
};

export default Post;
