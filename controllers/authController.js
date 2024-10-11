const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    //incorrect email
    if(err.message === 'incorrect email') {
        errors.email = 'that email is not registered';

    }

    //incorrect password
    if(err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    //duplicate error code
    if (errors.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    }

    //validation error
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken =(id) => {
    return jwt.sign({ id }, 'Maui_Burst secret', {
        expiresIn: maxAge
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password, role } = req.body;

    try{
        const user = await User.create({ email, password, role });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({ user: user._id});
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password, role} = req.body;

    try {
        const user = await User.login(email, password, role);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({ user: user._id});
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

