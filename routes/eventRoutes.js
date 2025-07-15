// file  routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { renderRegisterEventPage } = require('../controllers/eventController');

router.get('/registerEvent', auth, renderRegisterEventPage);

// router.get('/registerEvent', renderRegisterEventPage);
// router.get('/listEvents', auth, renderListEvents);


module.exports = router;
