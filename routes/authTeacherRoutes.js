const { Router } = require('express');
const authTeacherController = require('../controllers/authTeacherController');

const router = Router();

router.get('./userLoginRegistration/signup', authTeacherController.signup_get);
router.post('./userLoginRegistration/signup', authTeacherController.signup_post);
router.get('./userLoginRegistration/login', authTeacherController.login_get);
router.post('./userLoginRegistration/login', authTeacherController.login_post);

MediaSourceHandle.exports = router;