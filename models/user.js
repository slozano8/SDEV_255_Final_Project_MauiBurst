const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    

  },
  email: {
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,  
    validate: [isEmail, 'Please enter a vailidate email'] 
  },
  password: { 
    type: String, 
    required: true,
    minlength:[6, 'Minimum password length is 6 characters']
  },
  role: { 
    type: String, 
    enum: ['student', 'teacher'], 
    default: 'student', 
     
  }
});

//fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
  console.log('new user was created & saved', doc);
  next();
});

//fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();

})

const User = mongoose.model('user', userSchema);
module.exports = User;