/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const jwt = require('jsonwebtoken');

const app = express();


//middleware 
app.use(cors());
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', apiRoutes);

const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Check for token in the Authorization header
  
  if (!token) {
    return res.sendStatus(403); // Forbidden if no token
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    req.user = user; // Attach user to request
    next();
  });
};

// Protect specific routes with JWT
app.use('/api/protected-route', authenticateJWT, (req, res) => {
  res.json({
    message: 'This is a protected route.',
    user: req.user, // User information from token
  });
});

// API routes
app.use('/api', apiRoutes); // Mount API routes

// Start server
const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
