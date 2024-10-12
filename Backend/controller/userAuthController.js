const {admin, db} = require('../config/firebase-config');

  // Fungsi Login
  const signin = async (req, res) => {
    const idToken = req.body.token; // Destructure email and password from request body
  
    try {
      // Verify the ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid;
  
      // Update last login timestamp
      const userRef = db.collection('users').doc(uid);
      await userRef.update({
        lastLogin: admin.firestore.FieldValue.serverTimestamp()
      });
  
      res.status(200).json({
        statusCode: 200,
        message: "Token verified successfully",
        data: uid
      });
    } catch (error) {
      console.error("Login error:", error); // Log the error for debugging
      res.status(401).json({
        statusCode: 401, // Fixed typo from statuCode to statusCode
        message: 'Invalid or expired token',
        data: null
      });
    }
  };
  

  //Registrasi User
  const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
      // Membuat Akun
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });

      // Masukkan data pengguna ke firestore
      await db.collection('users').doc(userRecord.uid).set({
        email: userRecord.email,
        uid: userRecord.uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastLogin: admin.firestore.FieldValue.serverTimestamp()  // Set lastLogin saat pendaftaran
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
  };

module.exports = {signin, signup};