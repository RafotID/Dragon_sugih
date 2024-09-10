const admin = require("firebase-admin");

const serviceAccount = require("path/to/firebase-credential.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
