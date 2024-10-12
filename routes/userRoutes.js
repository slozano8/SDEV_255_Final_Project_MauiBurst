const express = require('express');

const router = express.Router();

router.get('/student', (req, res) => {
    res.redirect('/buildSchedule');
});

router.get('/teacher', (req, res) => {
    res.redirect('/courseindex');
})

module.exports = router;