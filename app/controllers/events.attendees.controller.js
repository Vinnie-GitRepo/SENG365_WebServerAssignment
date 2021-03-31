const events = require('../models/events.model');

exports.list = async function(req, res) {
    console.log("\nRequest to retrieve an event's attendees...");
    res.status(500).send();
};

exports.create = async function(req, res) {
    console.log("\nRequest to add an attendee to an event...");

    const token = req.headers["x-authorization"];
    if (!token) {
        res.status(401).send();
    }

    res.status(500).send();
};

exports.delete = async function(req, res) {
    console.log("\nRequest to remove an attendee from an event...");
    res.status(500).send();
};

exports.update = async function(req, res) {
    console.log("\nRequest to change the status of an attendee of an event...");
    res.status(500).send();
};