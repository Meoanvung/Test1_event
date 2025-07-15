// file: routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
router.post('/login', login);

router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
});


module.exports = router;
