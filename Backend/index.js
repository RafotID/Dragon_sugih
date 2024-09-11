const express = require('express');
const cors = require('cors');
const admin = require('./firebase-config');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Route untuk verifikasi token Firebase
app.post('/verifyToken', async (req, res) => {
  const idToken = req.body.token;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    res.json({ uid });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired tokenn' });
  }
});

// Route untuk registrasi user
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
 
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    res.json({ message: 'User registered successfully', uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on : ${PORT}`);
});
