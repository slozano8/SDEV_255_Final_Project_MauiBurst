exports.register = (req, res) => {
    const { username, email, password } = req.body;
  
    // Validate user input
    if (!username || !email || !password) {
      return res.status(400).send('Please fill in all fields');
    }
  
    // Check if user already exists
    User.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(400).send('Email already exists');
        }
  
        // Create a new user
        const newUser = new User({ username, email, password });
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