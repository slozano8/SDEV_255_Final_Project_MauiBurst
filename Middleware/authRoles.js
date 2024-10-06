//establish roles


function ensureTeacher(req, res, next) {
    if (req.user && req.user.role === 'teacher') {
        return next();
    }
    res.status(403).send('Access denied.'); 
}

module.exports = { ensureTeacher };