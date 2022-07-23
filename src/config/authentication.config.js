const admin = require("firebase-admin");
const serviceAccount = require("../../google-credentials.json");

const authentication = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
module.exports = authentication;
