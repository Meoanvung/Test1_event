//file: middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (
            req.user.role === 'admin' &&
            req.method === 'GET' &&
            req.originalUrl === '/registerEvent'
        ) {
            return res.status(403).json({ error: 'Admins are not allowed to access event registration page.' });
        }

        if (
            req.user.role === 'student' &&
            req.method === 'GET' &&
            (
                req.originalUrl === '/listRegistrations' ||
                req.originalUrl === '/viewRegistrations' ||
                req.originalUrl.startsWith('/getRegistrationsByDate')
            )
        ) {
            return res.status(403).json({ error: 'Students are not allowed to access this data.' });
        }

        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};





// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// module.exports = function (req, res, next) {
//     const authHeader = req.header('Authorization');

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'Access denied' });
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         console.log('Decoded user:', decoded);

//         if (
//             req.user.role === 'admin' &&
//             (req.method === 'POST' || req.method === 'DELETE') &&
//             req.originalUrl.startsWith('/registrations')
//         ) {
//             return res.status(403).json({ error: 'Admins are not allowed to register or unregister events.' });
//         }

//         if (
//             req.user.role === 'student' &&
//             req.method === 'GET' &&
//             (
//                 req.originalUrl === '/listRegistrations' ||
//                 req.originalUrl.startsWith('/getRegistrationsByDate')
//             )
//         ) {
//             return res.status(403).json({ error: 'Students are not allowed to access this data.' });
//         }

//         next();
//     } catch (err) {
//         res.status(400).json({ error: 'Invalid token' });
//     }
// };
