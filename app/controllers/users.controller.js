const user = require('../models/users.model');

/**
 *
 * @param req
 * @param res
 * @returns 201 {"userId": (id)}, 400, 500
 */
exports.register = async function(req, res) {
    console.log("\nRequest to register a new user...");

    try {
        const user_id = await user.create(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password);

        if (user_id === null) {
            res.status(400).send();
        } else {
            console.log(user_id);
            res.status(201).send({"userId": user_id});
        }
    } catch (err) {
        res.status(500).send();
        throw err;
    }
};


/**
 * @param req
 * @param res
 * @returns 200 {"userId": (id), "token": (token)}, 400, 500
 */
exports.login = async function(req, res) {
    console.log("\nRequest to log in an existing user...");

    res.status(400).send();
};

/**
 * @param req
 * @param res
 * @returns 200, 401, 500
 */
exports.logout = async function(req, res) {
    console.log("\nRequest to log out a currently authorised user...");
};

/**
 * @param req
 * @param res
 * @returns 200 {"firstName": (fname), ""},
 */
exports.read = async function(req, res) {
    console.log("\nRequest to retrieve information about a user...");
};

exports.update = async function(req, res) {
    console.log("\nRequest to change a user's details...");
};

