const user = require('../models/users.model');
const fs = require('fs');
// import { readFile, writeFile } from 'fs';
const getRawBody = require('raw-body');

exports.read = async function(req, res) {
    res.status(500).send();

    console.log("\nRequest to retrieve a user's profile image...");

    fs.readFile(`../../storage/images/user${userId}${extension}`, (err, data) => {
        if (err) throw err;
        res.status(200).send(data);
    });
};

exports.update = async function(req, res) {
    res.status(500).send();

    console.log("\nRequest to set a user's profile image...");

    const userId = req.params.user_id;
    const modificationData = req.body;
    const token = req.headers["x-authorization"];

    // if (token === null || token === "undefined" || token === undefined) {
    //     res.status(401).send();
    // }
    //
    // const modifyingSelf = await user.findByToken(token);
    // if (!modifyingSelf) {
    //     res.status(401).send();
    // }
    //
    // if (!(modifyingSelf == userId)) {
    //     res.status(403).send();
    // }


    let extension = `.${req.headers["content-type"].split("/")[1]}`;
    console.log(__dirname);
    // getRawBody(req)
    //     .then(function (buf) {
    //         res.statusCode = 200
    //         res.end(buf.length + ' bytes submitted')
    //     })
    //     .catch(function (err) {
    //         res.statusCode = 500
    //         res.end(err.message)
    //     })
    // console.log(req);

    fs.writeFile(`./storage/images/user${userId}${extension}`, req.body, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

};

exports.delete = async function(req, res) {
    res.status(500).send();
    console.log("\nRequest to delete a user's profile image...");
};