const events = require('../models/events.model');

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.list = async function(req, res) {
    console.log("\nRequest to view all events...");

    res.status(400).send();
};


exports.create = async function(req, res) {
    console.log("\nRequest to create a new event...");

    res.status(400).send();
};


exports.read = async function(req, res) {
    console.log("\nRequest to retrieve single event information...");

    res.status(404).send();
};


exports.update = async function(req, res) {
    console.log("\nRequest to update an events details...");

    res.status(400).send();
};


exports.delete = async function(req, res) {
    console.log("\nRequest to delete an event...");

    res.status(401).send();
};


exports.getCategories = async function(req, res) {
    console.log("\nRequest to retrieve all data about event categories...");
};
