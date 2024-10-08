const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { isJWT } = require('validator');

exports.register = async (req, res) => {
    const { username, password, } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Validate user input
    if (!username || !email || !password) {
      return res.status(400).send('Please fill in all fields');
    }
  
    // Check if user already exists
    User.findOne({ username })
      .then(existingUser => {
        if (existingUser) {
          return res.status(400).send('Username already exists');
        }
  
        // Create a new user
        const newUser = new User({ username, password: password, role });
        newUser.save()
          .then(() => {
            res.redirect('/login'); // Redirect to login page after successful registration
          })
          .catch(err => {
            console.error(err);
            res.status(500).send('Error registering user');
          });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error registering user');
      });
  };