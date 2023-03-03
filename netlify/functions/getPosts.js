const mongoose = require('mongoose');
const PostMessage = require( './utils/postMessage' );

let conn = null;
const uri = process.env.MONGODB_URI;

exports.handler = async (event, context, callback) => {

  //allows app to re-use `conn` between function calls.
  context.callbackWaitsForEmptyEventLoop = false;

  if (conn == null) {

    conn = mongoose.createConnection(uri, {
      // and tell the MongoDB driver to not wait more than 5 seconds
      // before erroring out if it isn't connected
      serverSelectionTimeoutMS: 5000
    });
    
    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn.asPromise();

    conn.model('postmessages', mongoose.Schema(PostMessage.postSchema));
  }

  const posts = conn.model('postmessages');

  const data = await posts.find();

  callback( null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
};
