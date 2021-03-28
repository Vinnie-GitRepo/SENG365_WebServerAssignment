const user = require('../models/users.model');


exports.register = async function(req, res) {
    console.log("\nRequest to register a new user...");


};

exports.login = async function(req, res) {
    console.log("\nRequest to log in an existing user...");

    res.status(400).send();
    res.status(500).send();
};

exports.logout = async function(req, res) {
    console.log("\nRequest to log out a currently authorised user...");
};

exports.read = async function(req, res) {
    console.log("\nRequest to retrieve information about a user...");
};

exports.update = async function(req, res) {
    console.log("\nRequest to change a user's details...");
};

