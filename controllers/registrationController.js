// file controller/registrationController.js
const Registration = require('../models/registrationModel');
const events = require('../db/events.json');

exports.registerEvent = async (req, res) => {
    const { studentId, eventId } = req.body || {};

    if (!studentId || !eventId) {
        return res.status(400).json({ message: 'Missing studentId or eventId in request body' });
    }

    const existing = await Registration.findOne({ studentId, eventId });
    if (existing) {
        return res.redirect('/registerEvent?error=already_registered');
    }

    const count = await Registration.countDocuments({ eventId });
    const event = events.find(e => e._id.$oid === eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (count >= event.capacity) return res.status(400).json({ message: 'Event full' });

    await Registration.create({ studentId, eventId });

    res.redirect('/registerEvent?success=true');
};


exports.unregisterEvent = async (req, res) => {
    const { registrationId } = req.params;

    await Registration.findByIdAndDelete(registrationId);

    res.redirect('/registerEvent?unregistered=true');
};


exports.listRegistrations = async (req, res) => {
    const regs = await Registration.find();
    if (!regs.length) return res.json({ message: 'No registrations found' });
    res.json(regs);
};

exports.getRegistrationsByDate = async (req, res) => {
    const { start, end } = req.query;
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (startDate >= endDate) return res.status(400).json({ message: 'Invalid date range' });
    const regs = await Registration.find({
        registrationDate: { $gte: startDate, $lte: endDate }
    });
    res.json(regs);
};

exports.renderListRegistrations = async (req, res) => {
    const regs = await Registration.find();
    res.render('listRegistrations', { registrations: regs });
};
