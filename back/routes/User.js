// userModel.js
const db = require('../config/db'); 

const User = {
    
    findUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
          
            const query = 'SELECT * FROM `users` WHERE `email` = ?';
            db.query(query, [email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    },

    
    updateUserProfile: (email, updates) => {
        return new Promise((resolve, reject) => {
            const { nom, prenom, sexe, tel, poste } = updates;
            const query = 'UPDATE users SET nom = ?, prenom = ?, sexe = ?, tel = ?, poste = ? WHERE email = ?';
            db.query(query, [nom, prenom, sexe, tel, poste, email], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.affectedRows); 
            });
        });
    }
};

module.exports = User;