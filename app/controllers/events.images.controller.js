const events = require('../models/events.model');
const user =

exports.read = async function(req, res) {
    console.log("\nRequest to retrieve an event's hero image...");
    res.status(500).send();
};

exports.update = async function(req, res) {
    console.log("\nRequest to set an event's hero image...");

    const token = req.headers["x-authorization"];
    if (!token) {
        res.status(401).send();
    }


    res.status(500).send();
};