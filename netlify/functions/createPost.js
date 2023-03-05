const mongoose = require("mongoose");
const PostMessage = require("./utils/postMessage").postSchema;
const fileSize = require("./utils/checkFileSize");
const constants = require("./utils/constants");

let conn = null;
const { UPLOAD_FILE_SIZE_LIMIT } = constants;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { title, message, selectedFile, creator, tags } = JSON.parse(
    event.body
  );

  let newPostMessage = {
    creator,
    message,
    selectedFile,
    tags,
    title,
  };

  // a safety measure if the file size limit setting in the front end is 
  // maliciously changed.
  const base64 = JSON.stringify(newPostMessage.selectedFile);

  if ( fileSize(base64) > UPLOAD_FILE_SIZE_LIMIT ) {
      console.log('selectedFile size =', fileSize(base64).toFixed(2),'kb')
      newPostMessage = {...newPostMessage, selectedFile: null }
      console.log('newPostMessage =', newPostMessage)
  }

  if (conn === null) {

    const { uri } = constants;
    
    conn = mongoose.createConnection(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    await conn.asPromise();
    conn.model('postmessages', mongoose.Schema(PostMessage));
  }

  const posts = conn.model("postmessages");
  const updatedPosts = await posts.create(newPostMessage);

    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPosts),
    });
};
