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
        db.collection('users').orderBy("id", "desc").limit(1).get().then(snapshot => {
          snapshot.forEach(doc => {
            let docRef2 = db.collection('users');
            docRef2.add({
              email: inFile.email,
              password: inFile.password,
              joined: new Date().toDateString(),
              lastLogin: "",
              id: (parseInt(doc.data().id) + 1).toString(),
              nLogins: 1
            }).then(ref => {
              res.send("User created");
            })
          })
        });
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
        res.status(406).send("No user");
      }
      docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          db.collection('users').doc(doc.id).update({
            nLogins: doc.data().nLogins + 1,
            lastLogin: new Date().toDateString()
          })
        });
      })
      snapshot.forEach(doc => {
        var data = doc.data();
        if (inFile.password == data.password) {
          data = JSON.stringify({
            email: data.email,
            id: data.id
          });
          res.status(200).send(data);
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
        email: inFile.newEmail
      }).then(function () {
        res.send('Email succesfully updated.');
      }).catch(err => {
        res.status(406).send('No account with that email found.');
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
        password: inFile.newPassword
      }).then(function () {
        res.send('Password succesfully updated.');
      }).catch(err => {
        res.status(406).send('No account with that email and password combination found.');
      });
    });
  })
})

router.post('/askNewFeature', function (req, res) {
  var inFile = JSON.parse(req.body)
  console.log(inFile)
  let docRef = db.collection('featureWishDB').where('title', '==', inFile.title).limit(1);
  docRef.get()
    .then(snapshot => {
      if (snapshot.empty) {
            let docRef2 = db.collection('featureWishDB');
            docRef2.add({
              title: inFile.title,
              voteCount: 1,
              lastVote: new Date().toDateString(),
              votesFrom: inFile.email != undefined ? inFile.email : ""
            }).then(ref => {
              res.send("New feature wished");
            })
      }
      snapshot.forEach(doc => {
        doc.data().update({
          voteCount: doc.data().voteCount + 1,
          lastVote: new Date().toDateString(),
        }).then(function () {
          res.send('Feature got new vote.');
        })
      });
    })
    .catch(err => {
      res.send(err)
    });
})

router.post('/voteFeature', function (req, res) {
  var inFile = JSON.parse(req.body);
  let docRef = db.collection('featureWishlist').where('title', '==', inFile.title).limit(1);
  docRef.get().then(snapshot => {
    if (snapshot.empty) {
      res.status(406).send("No items found");
    }
    docRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        db.collection('featureWishlist').doc(doc.id).update({
          voteCount: doc.data().voteCount + 1,
          lastVote: new Date().toDateString(),
          votesFrom: inFile.email != undefined ? doc.data().votesFrom.push(inFile.email) : doc.data().votesFrom
        }).then(function () {
          res.send('Vote is succesfully added.');
        })
      });
    }).catch(err => {
        res.status(406).send('Could not update that item.');
      });
    });
})

app.use('/.netlify/functions/user_functions', router);

module.exports.handler = serverless(app);