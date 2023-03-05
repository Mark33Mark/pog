const mongoose = require("mongoose");
const PostMessage = require("./utils/postMessage").postSchema;
const constants = require("./utils/constants");

let conn = null;
const uri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const id = JSON.parse(event.body);

  if (conn === null) {
    
    const { uri } = constants;

    conn = mongoose.createConnection(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    await conn.asPromise();

    conn.model("postmessages", mongoose.Schema(PostMessage));
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    callback(null, {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: `Your database doesn't have a post with id: ${id}`,
      }),
    });
  
  } else {
    
    const post = await conn.model("postmessages").findByIdAndRemove(id);

    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  }
};
