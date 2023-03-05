const mongoose = require('mongoose');
const PostMessage = require('./utils/postMessage').postSchema;
const constants = require("./utils/constants");

let conn = null;

exports.handler = async (event, context, callback) => {

  //allows app to re-use `conn` between function calls.
  context.callbackWaitsForEmptyEventLoop = false;

  if (conn === null) {

    const { uri } = constants;

    conn = mongoose.createConnection( uri, {
      // and tell the MongoDB driver to not wait more than 5 seconds
      // before erroring out if it isn't connected
      serverSelectionTimeoutMS: 5000
    });
    
    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn.asPromise();

    conn.model('postmessages', mongoose.Schema(PostMessage));
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
