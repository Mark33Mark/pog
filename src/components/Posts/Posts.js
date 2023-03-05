import React from "react";
import Post from "./Post/Post";
import "./Posts.css";

const Posts = ({ posts, setCurrentId }) => {

  return (
    <div className="main-container">
      {posts 
        ? posts.map((post) => (
            <div className="post-container" key={post._id}>
              <Post post={post} setCurrentId={setCurrentId} />
            </div>
          ))
        : null}
    </div>
  );
};

export default Posts;
