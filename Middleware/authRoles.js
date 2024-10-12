/*will activate when signin page is inserted*/



 /* const ensureTeacher = (req, res, next) => {
    if (req.user && req.user.role === 'teacher') {
        return next();
    } else {
        return res.status(403).json(  'Access denied, incorrect credentials' );
    }
};





const ensureStudent = (req, res, next) => {
    if (req.user && req.user.role === 'student') {
        return next();
    } else {
        return res.status(403).json( 'Access denied, incorrect credentials' );
    }
};

module.exports = { ensureTeacher, ensureStudent };*/



