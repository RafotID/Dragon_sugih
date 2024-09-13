const admin = require('../firebase-config');

const authRoute = (app) => {
  // Route untuk verifikasi token Firebase
  app.post('/login', async (req, res) => {
    const idToken = req.body.token;
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid;
      res.status(200).json({ 
        statusCode: 200,
        message: "Berhasil verify token",
        data: uid
      });
    } catch (error) {
      res.status(401).json({ 
        statuCode: 401,
        message: 'Invalid or expired token',
        data: null
      });
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
      res.status(200).json({ 
        statusCode: 200,
        message: 'User registered successfully', 
        data: { uid: userRecord.uid } 
      });
    } catch (error) {
      res.status(400).json({ 
        statusCode: 400,
        message: error.message,
        data: null,
      });
    }
  });
}


module.exports = authRoute