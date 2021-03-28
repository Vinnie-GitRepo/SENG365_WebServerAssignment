const user = require('../models/users.model');


exports.register = async function(req, res) {
    console.log("\nRequest to register a new user...");

    try {
        const user_id = user.create(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password);

        if (user_id === null) {
            res.status(400).send();
        }
        res.status(201).send({"userId": user_id});

    } catch (err) {
        res.status(500).send();
        throw err;
    }
};

exports.login = async function(req, res) {
    console.log("\nRequest to log in an existing user...");

    res.status(400).send();
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

