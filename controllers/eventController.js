// file: controllers/eventController.js
const events = require('../db/events.json');
const Registration = require('../models/registrationModel');

exports.renderRegisterEventPage = async (req, res) => {
    const studentId = req.user._id;

    const registrations = await Registration.find({ studentId });

    const eventList = await Promise.all(events.map(async e => {
        const count = await Registration.countDocuments({ eventId: e._id.$oid });

        const registered = registrations.find(r => r.eventId === e._id.$oid);

        return {
            ...e,
            _id: e._id.$oid,
            registeredCount: count,
            registeredId: registered ? registered._id : null
        };
    }));

    const success = req.query.success === 'true';
    const error = req.query.error || null;
    const unregistered = req.query.unregistered === 'true';

    res.render('registerEvent', { events: eventList, studentId, success, error, unregistered });
};


exports.renderListEvents = async (req, res) => {
    const events = await Event.find().sort({ date: 1 });
    res.render('listEvents', { events });
};
