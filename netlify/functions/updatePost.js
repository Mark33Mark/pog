const mongoose = require("mongoose");
const PostMessage = require("./utils/postMessage").postSchema;
const fileSize = require("./utils/checkFileSize");
const constants = require("./utils/constants");

let conn = null;
const { UPLOAD_FILE_SIZE_LIMIT } = constants;

exports.handler = async (event, context, callback) => {
  
  context.callbackWaitsForEmptyEventLoop = false;

  const { _id, title, message, selectedFile, creator, tags } = JSON.parse(
    event.body
  );

  let updatedPost = {
    _id,
    creator,
    title,
    message,
    tags,
    selectedFile,
  };

  // a safety measure if the file size limit setting in the front end is 
  // maliciously changed.
  const base64 = JSON.stringify(updatedPost.selectedFile);

  if ( fileSize(base64) > UPLOAD_FILE_SIZE_LIMIT ) {
      console.log('selectedFile size =', fileSize(base64).toFixed(2),'kb')
      updatedPost = {...updatedPost, selectedFile: null }
      console.log('newPostMessage =', updatedPost)
  }

  if (conn === null) {
    
    const { uri } = constants;
    
    conn = mongoose.createConnection(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    await conn.asPromise();
    conn.model("postmessages", mongoose.Schema(PostMessage));
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    callback(null, {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: `Your database doesn't have a post with id: ${_id}`,
      }),
    });
  } else {
    
    await conn
      .model("postmessages")
      .findByIdAndUpdate(_id, updatedPost, { new: true });

    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });
  }
};
