const events = require('../models/events.model');

exports.list = async function(req, res) {
    console.log("\nRequest to retrieve an event's attendees...");
};

exports.create = async function(req, res) {
    console.log("\nRequest to add an attendee to an event...");
};

exports.delete = async function(req, res) {
    console.log("\nRequest to remove an attendee from an event...");
};

exports.update = async function(req, res) {
    console.log("\nRequest to change the status of an attendee of an event...");
};