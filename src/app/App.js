import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts, getAllPosts } from "../store/postsSlice";
import Posts from "../components/Posts/Posts";
import Loader from "../components/Loader/Loader";
import PogTitle from "../assets/images/pog";
import Form from "../components/Form/Form";
import "./App.css";

const App = () => {
  const [currentId, setCurrentId] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(getAllPosts);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  return (
    <div className="container-landing-main">
      <div className="appBar">
        <PogTitle
          className="heading-landing"
          width="100"
          height="70"
          p_color="rgb(255 41 117)"
          o_color="rgb(242 34 255)"
          g_color="rgb(140 30 255)"
        />
      </div>
      {posts.loading ? (
        <Loader />
      ) : (
        <div className="container-cards">
          <Posts posts={ posts.list } setCurrentId={ setCurrentId } />
          <Form currentId={ currentId } setCurrentId={ setCurrentId } />
        </div>
      )}
    </div>
  );
};

export default App;
