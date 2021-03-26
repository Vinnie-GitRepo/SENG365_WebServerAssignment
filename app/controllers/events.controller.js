const events = require('../models/events.model');

exports.list = async function(req, res) {
    console.log("\nRequest to view all events...");
};

exports.create = async function(req, res) {
    console.log("\nRequest to create a new event...");
};

exports.read = async function(req, res) {
    console.log("\nRequest to retrieve single event information...");
};

exports.update = async function(req, res) {
    console.log("\nRequest to update an events details...");
};

exports.delete = async function(req, res) {
    console.log("\nRequest to delete an event...");
};

exports.getCategories = async function(req, res) {
    console.log("\nRequest to retrieve all data about event categories...");
};
