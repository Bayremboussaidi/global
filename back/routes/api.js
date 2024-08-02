



const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const router = express.Router();


/*signup*/


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

  router.post('/transport', (req, res) => {
    const { adresseDest, dateDepart, heureDepart } = req.body;
    const query = 'INSERT INTO transport (adresseDest, dateDepart, heureDepart) VALUES (?, ?, ?)';
    db.query(query, [adresseDest, dateDepart, heureDepart], (err, result) => {
      if (err) {
        console.error('Error inserting transport:', err);
        res.status(500).send('Error inserting transport');
      } else {
        res.status(200).send('Transport added successfully');
      }
    });
  });

  router.get('/transport', (req, res) => {
    const query = 'SELECT * FROM transport';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching transport list:', err);
        res.status(500).send('Error fetching transport list');
      } else {
        res.status(200).json(results);
      }
    });
  });

  
/*repas*/

router.post('/repas', (req, res) => {
  const { nom, prix } = req.body;
  const query = 'INSERT INTO repas (nom, prix) VALUES (?, ?)';
  db.query(query, [nom, prix], (err, result) => {
    if (err) {
      console.error('Error inserting repas:', err);
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






/*profile update*/

const User = require('./User');

router.put('/profile', async (req, res) => {
  const { email, password, nom, prenom, sexe, tel, poste } = req.body;

  try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials.' });
      }

      
      if (nom !== undefined) user.nom = nom; 
      if (prenom !== undefined) user.prenom = prenom; 
      if (sexe !== undefined) user.sexe = sexe; 
      if (tel !== undefined) user.tel = tel; 
      if (poste !== undefined) user.poste = poste; 

      
      await user.save();

      
      res.status(200).json({
          message: 'Profile updated successfully!',
          user: {
              nom: user.nom,
              prenom: user.prenom,
              email: user.email,
              sexe: user.sexe,
              tel: user.tel,
              poste: user.poste,
          },
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
  }
});


  


module.exports = router;
