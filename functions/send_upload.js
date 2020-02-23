const express = require("express");
const serverless = require("serverless-http");
const admin = require('firebase-admin');

// Firebase
let serviceAccount = {
  type: "service_account",
  project_id: "blinkstorage-dd942",
  private_key_id: "266ccc7255f18c1a54b666c5db165c4c1ff6c6a0",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDlwPoCt0WKoMTl\nAx+UqiVn63UpbEHSuO/vyO6ryMfyGPJ9BkCnlqiRcSMQYEOSs+D2vTYUOxaJSguV\nHzuBiurHuGHMnPEqGbRaEQzL83zs6c+4A1izLQwcbFs1+ALoBGvfB52EWM7k6BE0\nC8RAcU+IyCJ2fhK6X26opDuguIf55MxkfLbR7ptNGu6lRYkoKpkPUFlOiXQltZwL\nkBTkB/92M3pGf+F2VWn45OlGBtw40Po6JzZppAGY1qXmNY9mXNu/oS5iBEJklJv6\nd+bZYbfyu0anuuczX9pCG9ndhnDwb+s5LFD7zVsC5pvW/aK3Ml587VMnBfFZii6f\nGCQ6fKLfAgMBAAECggEAMH/wpuMeTHnMppVmtMDIHaxQMrrWGFAO4lzVuTCsuJf4\nlFjeDCKbGfy6jKnticnsCtn9UP76LmgRktyheKKlFhz/lCxrIlqDvmGMBH+1VuOy\nhCM8tbIkNNnQ1U8x+d15Ef8vCrGelya//u8e8gWZZwPsdnv9oxcjKnlk1vQtTBxQ\nbdnr3RW15vnYa3RXjFaQ/dbDD/FoQ812iQSAZlQZ9sJqzAouC++FWhXwO0iJ+LDI\nzIwnCGzEOIZ8KhYi8R56vqoR1EZO+I+3ZHqnhxKpFft5Ig45phKxv1iD7j28Yasp\nFWeBvZZWzsZ1eOfKFQ3pKfFeW2QId7nUQ75l/+QpuQKBgQD7c0T1FFnG8moJROfP\neKQcWeJtt8POMBtidYRN7wfs5r7wRu0Z/gzf9vQgMxHEhCsy4ELOoYYyCHTTe4Ta\nkHTstB8H7kPCxV3WJ4+PnIvbnRr7PsnNBN37tL/QlRmOpKh/0p2okc/APc5Fe1tB\nyrPC7pJtu7VwyM0f+LoorRt/yQKBgQDp6TVIUGwS2+AVlZIjoS6oqvXdebrY2h59\nFN2cLYgJswXj/ICF3pDGc0/iHaEkc3OdAbzjO5jmWMp4baB8mITV7Cfw6ZE7y9WB\nQH/Yj6YNLKM+cBGS5jaYtNMd2umvX51v/24iMwymkHtgvdBq/j2Pd1NeWa6GqGZ0\n3f9t+CDxZwKBgFfyRyoZBhWJcADx8soj/fJUldeeMIQLW2iihbXkZrc7NYlApWkz\n7DjhXR1t/0bmm11eBr/SyubxAjt9tkfjwqGPllLlyRl0go+GorWuIVScrHU3zslA\nbIu++l/v5lJ30N90QORWq30noN+4d4CZbyo820Y6Iwnhka0fB612bmnRAoGBAMnP\nYiAs+sFeoLwemsJQyy/MqGnYH8P+lDV4riaUBf3QTjHAZaaaOrBtRqugwqnvTf1V\nRYGLpsR+MNmsQ72b3Wev41nwOlSr7V4hpuvSLALL02AIUrE6HDquMENe3yVmyi+Z\n4oxxHOYMW9ZAjjPxfG1uFyidGX2mhxcnfbyESu/bAoGAdve5P8ipjhBZc6iB5GPo\n1DzloCUTB3fwJizhlsuQTGczCa27E5LGqolhqgLb2nADOp+IB+Iu+e7bZMLv+9uk\n3uCYU0BbyTGqkw2Uiwh7pwyMqDjDjRAK2CtoJB0Y/WXs0xBXZMbb7MUIgLdwyT2h\nidLzZyn/vP7yTakpa30hIqo=\n-----END PRIVATE KEY-----\n",
  client_email: "thecognitivenetworkdatabase@blinkstorage-dd942.iam.gserviceaccount.com",
  client_id: "114639664673371948529",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/thecognitivenetworkdatabase%40blinkstorage-dd942.iam.gserviceaccount.com"
}

 admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

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