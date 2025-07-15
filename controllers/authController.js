// file controllers/authController.js

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.render('login', { error: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.cookie('token', token, { httpOnly: true });

    if (user.role === 'student') {
        return res.redirect('/registerEvent');
    } else if (user.role === 'admin') {
        return res.redirect('/viewRegistrations');
    }

    res.redirect('/auth/login');
};



// exports.login = async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user || !bcrypt.compareSync(password, user.password)) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
//     res.json({ token });
// };