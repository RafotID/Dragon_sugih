const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute')


const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// authentikasi
authRoute(app)

// game


app.listen(PORT, () => {
  console.log(`Server running on : ${PORT}`);
});
