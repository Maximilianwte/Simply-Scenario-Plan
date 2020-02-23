// Right now I tried following the guide for netlify functions & firebase from:
// https://jackwhiting.co.uk/posts/using-firebase-admin-sdk-with-netlify-lambda-functions/

const express = require("express");
const serverless = require("serverless-http");
const admin = require('firebase-admin');

let serviceAccount = require("./key.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

/* function upload_request(in_file) {
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
} */

// Express
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send('This route only takes POST requests.')
})
app.post('/', function (req, res) {
  upload_request(JSON.parse(req.body))
  res.send('Data request succesful.')
})

app.use('/.netlify/functions/send_upload', router);

module.exports.handler = serverless(app);