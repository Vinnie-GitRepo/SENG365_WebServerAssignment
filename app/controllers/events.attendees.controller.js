const events = require('../models/events.model');
const user = require('../models/users.model');

exports.list = async function(req, res) {
    console.log("\nRequest to retrieve an event's attendees...");

    if (await events.checkExists(req.params.event_id) == 0) {
        res.status(404).send();
    }

    res.status(500).send();
};

exports.create = async function(req, res) {
    console.log("\nRequest to add an attendee to an event...");

    const token = req.headers["x-authorization"];
    if (!token) {
        res.status(401).send();
    }

    const event = await events.findById(req.params.event_id);
    if (!event) {
        res.status(404).send();
    }

    res.status(500).send();
};

exports.delete = async function(req, res) {
    console.log("\nRequest to remove an attendee from an event...");

    const token = req.headers["x-authorization"];
    if (!token) {
        res.status(401).send();
    }

    const foundUser = await user.findByToken(token);
    if (!foundUser) {
        res.status(401).send();
    }

    res.status(500).send();
};

exports.update = async function(req, res) {
    console.log("\nRequest to change the status of an attendee of an event...");

    const token = req.headers["x-authorization"];
    if (!token) {
        res.status(401).send();
    }

    const foundUser = await user.findByToken(token);
    if (!foundUser) {
        res.status(401).send();
    }

    res.status(500).send();
};