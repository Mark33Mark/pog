import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findPost, createPost, updatePost } from "../../store/postsSlice";
import FileBase64 from "react-file-base64";
import PogTitle from "../../assets/images/pog";
import "./Form.css";

const UPLOAD_FILE_SIZE_LIMIT = 5000;

const cleanForm = {
  creator: "",
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState(cleanForm);
  const post = useSelector(findPost(currentId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const clear = () => {
    setCurrentId(false);
    setPostData(cleanForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentId) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(postData));
      clear();
    }
  };

  return (
    <div className="container-form">
      <div className="paper">
        <form
          autoComplete="off"
          noValidate
          className="form"
          onSubmit={handleSubmit}
        >
          <h6 className="heading-form">
            {
              currentId ? 
                `Editing: "${post.title}"` 
              : 
                <div className="default-heading">Get
                <PogTitle
                  className="heading-landing"
                  width="60"
                  height="60"
                  p_color="rgb(140,30,255)"
                  o_color="rgb(255,211,25)"
                  g_color="rgb(255,144,31)"
                />'ing</div>
            }
          </h6>

          <div className="form__group">
            <textarea
              id="name"
              className="form__field"
              name="creator"
              placeholder="your name"
              value={postData.creator}
              onChange={(e) =>
                setPostData({ ...postData, creator: e.target.value })
              }
            />
            <label className="form__label" htmlFor="name">
              name
            </label>
          </div>

          <div className="form__group">
            <textarea
              id="title"
              className="form__field"
              name="title"
              placeholder="title of post"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
            <label className="form__label" htmlFor="title">
              title
            </label>
          </div>

          <div className="form__group">
            <textarea
              id="message"
              className="form__field"
              name="message"
              placeholder="message"
              rows={4}
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
            />
            <label className="form__label" htmlFor="message">
              message
            </label>
          </div>

          <div className="form__group">
            <textarea
              id="tags"
              className="form__field"
              name="tags"
              placeholder="tags (comma separated)"
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(",") })
              }
            />
            <label className="form__label" htmlFor="tags">
              tags
            </label>
          </div>

          <div className="input-file">
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => {
                
                const base64_length =
                  base64.length - "data:image/png;base64,".length;
                
                const sizeInKiloBytes =
                  (4 * Math.ceil(base64_length / 3) * 0.5624896334383812) / 1000;

                console.log("fileSizeInKiloBytes = ", sizeInKiloBytes);

                if (sizeInKiloBytes > UPLOAD_FILE_SIZE_LIMIT) {
                  alert(
                    `                    ------------------------------------------------
                    
                    😒...oh no
                    your image exceeds the file size limit of ${UPLOAD_FILE_SIZE_LIMIT / 1000}Mb, 
                    your image is ${(sizeInKiloBytes / 1000).toFixed(2)}Mb
                    Please try with again with a smaller image size.

                    ------------------------------------------------`
                  );
                  setPostData({ ...postData, selectedFile: "" });

                } else {

                  setPostData({ ...postData, selectedFile: base64 });

                }
              }}
            />
          </div>
          <button className="button-submit" type="submit">
            submit
          </button>
        </form>
        <button className="button-clear" onClick={clear}>
          clear form
        </button>
      </div>
    </div>
  );
};

export default Form;
