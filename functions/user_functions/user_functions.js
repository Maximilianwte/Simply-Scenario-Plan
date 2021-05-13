// https://jackwhiting.co.uk/posts/using-firebase-admin-sdk-with-netlify-lambda-functions/
const express = require("express");
const serverless = require("serverless-http");

// Firestore

var admin = require("firebase-admin");

var serviceAccount = require("./key.json");
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //databaseURL: "https://simplyscenariodb-313606.firebaseio.com"
  });
}
let db = admin.firestore();

// Express App
const app = express();
const router = express.Router();

// Firestore Routes

router.get("/", (req, res) => {
  res.send('This route only user related requests.')
})

router.post('/create_user', function (req, res) {
  var inFile = JSON.parse(req.body)
  let docRef = db.collection('users').where('email', '==', inFile.email).limit(1);
  docRef.get()
    .then(snapshot => {
      if (snapshot.empty) {
        let docRef2 = db.collection('users');

        docRef2.add({
          email: inFile.email,
          password: inFile.password,
          joined: new Date().toDateString()
        }).then(ref => {
          res.send("User created");
        })
      }
      snapshot.forEach(doc => {
      res.send("User already exists")
      });
    })
    .catch(err => {
      res.send(err)
    });
})

router.post('/read_user', function (req, res) {
  var inFile = JSON.parse(req.body);
  let docRef = db.collection('users').where('email', '==', inFile.email).where('password', '==', inFile.password).limit(1);
  docRef.get().then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        res.send("No user");
      }
      snapshot.forEach(doc => {
        var data = doc.data();
        if (inFile.password == data.password) {
          //data = JSON.stringify(data);
          res.send("Found user");
        }
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
});

router.post('/update_userAccess/email', function (req, res) {
  var inFile = JSON.parse(req.body);
  let docRef = db.collection('users').where('email', '==', inFile.activeEmail).limit(1);
  docRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      db.collection('users').doc(doc.id).update({
        Email: inFile.newEmail
      }).then(function () {
        res.send('Email succesfully updated.');
      }).catch(err => {
        res.send('No fitting email found.');
      });
    });
  })
})

router.post('/update_userAccess/password', function (req, res) {
  var inFile = JSON.parse(req.body);
  let docRef = db.collection('users').where('email', '==', inFile.email).where('password', '==', inFile.activePassword).limit(1);
  docRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      db.collection('users').doc(doc.id).update({
        Password: inFile.newPassword
      }).then(function () {
        res.send('Password succesfully updated.');
      }).catch(err => {
        res.send('No fitting password found.');
      });
    });
  })
})

app.use('/.netlify/functions/user_functions', router);

module.exports.handler = serverless(app);