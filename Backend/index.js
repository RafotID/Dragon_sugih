const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoute')
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// 
app.use('/api', authRoutes)

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => {
  console.log(`Server running on : ${PORT}`);
});
