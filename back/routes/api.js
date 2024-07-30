// routes/api.js
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { nom, prenom, sexe, tel, email, poste, password } = req.body;

  if (!nom || !prenom || !sexe || !tel || !email || !poste || !password) {
    return res.status(400).send('All fields are required');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { nom, prenom, sexe, tel, email, poste, password: hashedPassword };

  const query = 'INSERT INTO users SET ?';

  db.query(query, user, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send('Email already exists');
      }
      return res.status(500).send('Server error');
    }
    res.status(201).send('User registered');
  });
});


////signin
/*
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
  
    
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
  
    // Query to find the user by email
    const query = 'SELECT * FROM users WHERE email = ?';
  
    db.query(query, [email], async (err, results) => {
      if (err) {
        return res.status(500).send('Server error');
      }
  
      // Check if user exists
      if (results.length === 0) {
        return res.status(401).send('Invalid credentials'); // User not found
      }
  
      const user = results[0];
  
      // Compare the password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send('Invalid credentials'); // Password does not match
      }


      const JWT_SECRET = process.env.JWT_SECRET
  
      // Generate a JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '72h' });
      
      // Respond with user details and token
      res.json({
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        sexe: user.sexe,
        tel: user.tel,
        poste: user.poste,
        token
      });
    });
  });
  

module.exports = router;*/
