// file app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

require('dotenv').config();

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection failed:', err.message));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    console.log('🌐 Request:', req.method, req.url);
    next();
});


// Routes

app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

app.use('/auth', require('./routes/authRoutes'));
app.use('/', require('./routes/registrationRoutes'));
app.use('/', require('./routes/eventRoutes'));


// Start Server
app.listen(process.env.PORT || 3000, () => console.log('Server running'));


// 	http://localhost:3000/auth/login
// http://localhost:3000/registerEvent
// http://localhost:3000/viewRegistrations
