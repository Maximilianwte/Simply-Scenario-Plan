const firebase = require("firebase");
var firebaseConfig = {
  apiKey: "AIzaSyByZkb1Pq2zNoSzaZ-ujPbgnD3o0zoJwJA",
  authDomain: "blinkstorage-dd942.firebaseapp.com",
  databaseURL: "https://blinkstorage-dd942.firebaseio.com",
  projectId: "blinkstorage-dd942",
  storageBucket: "blinkstorage-dd942.appspot.com",
  messagingSenderId: "867910258491",
  appId: "1:867910258491:web:9c8fd240448d70e0"
}
firebase.initializeApp(firebaseConfig);

function upload_request(in_file) {
  db.collection("requests").add({
          products: in_file.products,
          email: in_file.email,
          size: in_file.size,
          date: new Date().toLocaleString()
      })
      .then(function (docRef) {
          return 0;
      })
      .catch(function (error) {
          console.error("Error adding document: ", error);
      });
}

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const data = JSON.parse(event.body);
  //const params = querystring.parse(event.body);
  //const name = params.name || "World";
  console.log("Request worked with data: " + data)
  upload_request(data)
  return {
    statusCode: 200,
    body: "Upload to database worked."
  };
};