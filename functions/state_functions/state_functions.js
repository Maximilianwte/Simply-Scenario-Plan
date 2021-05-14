// https://jackwhiting.co.uk/posts/using-firebase-admin-sdk-with-netlify-lambda-functions/
const express = require("express");
const serverless = require("serverless-http");

// Firestore

var admin = require("firebase-admin");

var serviceAccount = require("./key.json");
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://farmify-2d43e.firebaseio.com"
  });
}
let db = admin.firestore();

// Express App
const app = express();
const router = express.Router();

// Firestore Routes

router.get("/", (req, res) => {
  res.send('This route only state related requests.')
})


// check for older state of this id and overwrite if existing, else new
// check by: userID and nameOfFile
router.post('/save', function (req, res) {
  var inFile = JSON.parse(req.body)
  let docRef = db.collection('states').where('userId', '==', inFile.id).where('title', '==', inFile.title);
  docRef.get()
    .then(snapshot => {
      if (snapshot.empty) {
        let docRef2 = db.collection('states');

        docRef2.add({
          userId: inFile.id,
          title: inFile.title,
          state: inFile.state,
          updated: new Date().toDateString()
        }).then(ref => {
          res.send("State saved");
        })
      } else {
        snapshot.forEach(doc => {
            db.collection('states').doc(doc.id).update({
              state: inFile.state,
              updated: new Date().toDateString()
            }).then(function () {
              res.send('State got updated.');
            });
          })
          .catch(err => {
            res.send(err)
          });
      }
    })
})

// load all state names
router.post('/load_states', function (req, res) {
  var inFile = JSON.parse(req.body);
  let docRef = db.collection('states').where('userId', '==', inFile.id);
  docRef.get().then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    // hope making a new array and pushing data works.
    var DatabaseData = new Array();
    snapshot.forEach(doc => {
      // does .title work like that?
      DatabaseData.push(doc.data().title);
    });
    DatabaseData = JSON.stringify(DatabaseData);
    res.send(DatabaseData);
  })
})

// load state of variables
router.post('/load', function (req, res) {
  var inFile = JSON.parse(req.body);
  let docRef = db.collection('users').where('Email', '==', inFile.ActiveEmail).limit(1);
  docRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      db.collection('users').doc(doc.id).update({
        Email: inFile.NewEmail
      }).then(function () {
        res.send('Email succesfully updated.');
      }).catch(err => {
        res.send('No fitting email found.');
      });
    });
  })
})


app.use('/.netlify/functions/state_functions', router);

module.exports.handler = serverless(app);