const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const db = require('../config/db');  
require('dotenv').config();  
const router = express.Router();
router.use(express.json());  

/* Signup */
router.post('/signup', async (req, res) => {
  try {
    const { nom, prenom, sexe, tel, email, poste, password, cin } = req.body;

    if (!nom || !prenom || !sexe || !tel || !email || !poste || !password || !cin) {
      return res.status(400).send('All fields are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { nom, prenom, sexe, tel, email, poste, password: hashedPassword, cin };
    const query = 'INSERT INTO users SET ?';

    db.query(query, user, (err, result) => {
      if (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send('Email already exists');
        }
        return res.status(500).send('Server error');
      }
      res.status(201).json({ message: 'User registered', user: { nom, prenom, sexe, tel, email, poste, cin } });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Unexpected error occurred');
  }
});

/* Signin */
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

    if (results.length === 0) {
      return res.status(401).send('Invalid credentials'); // User not found
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    // Generate JWT token
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

/* Fetch all users */
router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users from database:', err);
      return res.status(500).json({ error: 'Database error.' });
    }
    res.json(results);
  });
});

/* Transport */
router.post('/transport', (req, res) => {
  const { adresseDest, dateDepart, NbrePlace, numID } = req.body;

  if (!adresseDest || !dateDepart || typeof NbrePlace === 'undefined' || typeof numID === 'undefined') {
    return res.status(400).json({ error: 'All fields (adresseDest, dateDepart, NbrePlace, and numID) are required' });
  }

  const query = 'INSERT INTO transport (adresseDest, dateDepart, NbrePlace, numID) VALUES (?, ?, ?, ?)';
  db.query(query, [adresseDest, dateDepart, NbrePlace, numID], (err, result) => {
    if (err) {
      console.error('Error inserting transport:', err);
      return res.status(500).json({ error: 'Error inserting transport' });
    } 
    return res.status(201).json({ message: 'Transport added successfully', transportId: result.insertId });
  });
});

// GET  all transports
router.get('/transport', (req, res) => {
  const query = 'SELECT * FROM transport';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching transport list:', err);
      return res.status(500).json({ error: 'Error fetching transport list' });
    }
    return res.status(200).json(results);
  });
});

/* Repas */
router.post('/repas', (req, res) => {
  const { nom, prix } = req.body;

  if (!nom || typeof prix !== 'number') {
    return res.status(400).send('Invalid input data');
  }

  const query = 'INSERT INTO repas (nom, prix) VALUES (?, ?)';
  
  db.query(query, [nom, prix], (err, result) => {
    if (err) {
      console.error('Error inserting repas:', err.message);
      res.status(500).send('Error inserting repas');
    } else {
      res.status(200).send('Repas added successfully');
    }
  });
});

router.get('/repas', (req, res) => {
  const query = 'SELECT * FROM repas';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching repas:', err);
      res.status(500).send('Error fetching repas');
    } else {
      res.status(200).json(results);
    }
  });
});

/* Profile Update */
router.put('/profile', async (req, res) => {
  const { email, password, nom, prenom, sexe, tel, poste } = req.body;

  
  const User = require('./User'); 

  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const updates = {};
    if (nom !== undefined) updates.nom = nom; 
    if (prenom !== undefined) updates.prenom = prenom; 
    if (sexe !== undefined) updates.sexe = sexe; 
    if (tel !== undefined) updates.tel = tel; 
    if (poste !== undefined) updates.poste = poste;

    // Update the user profile in the database
    await User.updateUserProfile(user.email, updates);
    const updatedUser = await User.findUserByEmail(user.email);

    res.status(200).json({
      message: 'Profile updated successfully!',
      user: {
        nom: updatedUser.nom,
        prenom: updatedUser.prenom,
        email: updatedUser.email,
        sexe: updatedUser.sexe,
        tel: updatedUser.tel,
        poste: updatedUser.poste,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

/* Reclamation */
router.post('/reclamation', (req, res) => {
  const { email, reclam } = req.body;

  if (!email || !reclam) {
    return res.status(400).json({ error: 'Email and reclamation text are required.' });
  }

  db.query(
    'INSERT INTO reclamation (email, reclam) VALUES (?, ?)',
    [email, reclam],
    (err, result) => {
      if (err) {
        console.error('Error inserting data into database:', err);
        return res.status(500).json({ error: 'Database error.' });
      }
      res.status(201).json({ id: result.insertId, message: 'Reclamation added successfully.' });
    }
  );
});

// GET all reclamations
router.get('/reclamation', (req, res) => {
  db.query('SELECT * FROM reclamation', (err, results) => {
    if (err) {
      console.error('Error fetching reclamations from database:', err);
      return res.status(500).json({ error: 'Database error.' });
    }
    res.json(results);
  });
});

// Commande Repas endpoints using router
router.post('/commanderepas', (req, res) => {
  const { nomR, commentaire, cin, quantity } = req.body;

  const sql = `INSERT INTO commanderepas (nomR, commentaire, cin, quantity) VALUES (?, ?, ?, ?)`;
  const values = [nomR, commentaire, cin, quantity];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Error inserting data' });
    }
    res.status(201).json({ id: results.insertId, nomR, commentaire, cin, quantity });
  });
});

// Endpoint to get all repas commands
router.get('/commanderepas', (req, res) => {
  const sql = `SELECT * FROM commanderepas`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Error fetching data' });
    }
    res.json(results);
  });
});

module.exports = router;