//file : routes/registrationRoutes.js
const express = require('express');
const router = express.Router();
const {
    registerEvent,
    unregisterEvent,
    listRegistrations,
    getRegistrationsByDate
} = require('../controllers/registrationController');
const auth = require('../middleware/authMiddleware');

router.post('/registrations', auth, registerEvent);
router.delete('/registrations/:registrationId', auth, unregisterEvent);
router.get('/listRegistrations', auth, listRegistrations);
router.get('/getRegistrationsByDate', auth, getRegistrationsByDate);

const { renderListRegistrations } = require('../controllers/registrationController');
router.get('/viewRegistrations', auth, renderListRegistrations);

// router.get('/viewRegistrations', renderListRegistrations);


module.exports = router;