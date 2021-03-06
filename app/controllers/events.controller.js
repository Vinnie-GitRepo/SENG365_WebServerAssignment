const events = require('../models/events.model');

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.list = async function(req, res) {
    console.log("\nRequest to view all events...");
    // console.log(req)
    // console.log(req.params);
    try {
        const eventsList = await events.findByParams(req.query);
        res.status(200).send(eventsList)
    } catch (err) {
        console.log(err);
        res.status(400).send()
    }

    res.status(500).send();
};


exports.create = async function(req, res) {
    console.log("\nRequest to create a new event...");

    const token = req.headers["x-authorization"];
    if (!token) {
        res.status(401).send();
    }

    res.status(400).send();
};


exports.read = async function(req, res) {
    console.log("\nRequest to retrieve single event information...");


    const eventId = req.params.event_id;
    // console.log(req.params);

    const event = await events.findById(eventId);

    try {
        res.status(200).send(event);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }

    res.status(404).send();
};


exports.update = async function(req, res) {
    console.log("\nRequest to update an events details...");

    const token = req.headers["x-authorization"];
    if (!token) {
        res.status(401).send();
    }

    res.status(400).send();
};


exports.delete = async function(req, res) {
    console.log("\nRequest to delete an event...");

    const token = req.headers["x-authorization"];
    if (!token) {
        res.status(401).send();
    }

    res.status(500).send();
};


exports.getCategories = async function(req, res) {
    console.log("\nRequest to retrieve all data about event categories...");

    res.status(500).send();
};
