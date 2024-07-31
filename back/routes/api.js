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



/*signin*/

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
        return res.status(401).send('Invalid credentials');
      }
      if (isMatch) {
       return res.status(200).send('correct') ;
      }


      require('dotenv').config();
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





  /*transport*/

  router.post('/transport', async (req, res) => {
    const { adresseDest, dateDepart, heureDepart } = req.body;

    // Validate the inputs
    if (!adresseDest || !dateDepart || !heureDepart) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const connection = await mysql.createConnection(db);
        // Insert record into the transport table
        const [result] = await connection.execute(
            'INSERT INTO transport (adresseDest, dateDepart, heureDepart) VALUES (?, ?, ?)',
            [adresseDest, dateDepart, heureDepart]
        );

        //  fetch the newly created transport for the response
        const [newTransport] = await connection.execute('SELECT * FROM transport WHERE id = ?', [result.insertId]);

        res.status(201).json(newTransport[0]);
        await connection.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/transport - Get all transports
router.get('/transport', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [transports] = await connection.execute('SELECT * FROM transport');

        res.json(transports);
        await connection.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
