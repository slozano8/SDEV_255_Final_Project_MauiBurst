module.exports.sign_get = (req,res) => {
    res.render('signup');
}

module.exports.login_get = (req,res) => {
    res.render('login');
}

module.exports.sign_post = (req,res) => {
    res.send('signup');
}

module.exports.login_post = (req,res) => {
    res.send('login');
}