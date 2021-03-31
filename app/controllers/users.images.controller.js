const user = require('../models/users.model');
const photo = require('../models/photos.model');

function getExtension(mimeType) {
    let extension = null;
    if (mimeType === "image/jpeg") {
        extension = ".jpeg";
    }
    if (mimeType === "image/png") {
        extension = ".png";
    }

    return extension;
}


exports.read = async function(req, res) {

    console.log("\nRequest to retrieve a user's profile image...");

    try {
        const filename = await user.getImageFilename(req.params.user_id);
        if (filename == null) {
            res.status(404).send();
        } else {
            const rawImage = await photo.retrieveByFilename(filename);
            res.status(200).contentType(rawImage.mimeType).send(rawImage);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

exports.update = async function(req, res) {

    console.log("\nRequest to set a user's profile image...");

    const image = req.body;
    const userId = req.params.user_id;

    // console.log(req.params);
    // return;
    console.log("===========================================");

    console.log(image);


    const retrievedUser = await user.getUserById(userId);
    console.log("===========================================");

    console.log(retrievedUser);
    if (!retrievedUser) {
        res.status(404).send();
    }

    const token = req.headers["x-authorization"];

    if (token === null) {
      res.status(401);
    }

    const authorizedUserId = await user.findByToken(token);

    if (userId != authorizedUserId) {
        res.status(403).send();
    }


    const fileExtension = getExtension(req.header("Content-Type"));
    console.log("===========================================");
    console.log(fileExtension);
    if (fileExtension === null) {
        res.status(400).send();
    }

    try {
        const currentImageFilename = await user.getImageFilename(userId);
        console.log("===========================================");
        console.log(currentImageFilename);
        console.log("===========================================");

        let returnOK = false;
        if (currentImageFilename) {
            returnOK = true;
            await photo.deleteByFilename(currentImageFilename);
        }

        const filename = await photo.store(image, fileExtension);
        await user.setImageFilename(filename, userId);

        if (returnOK) {
            res.status(200).send();
        } else {
            res.status(201).send();
        }
    } catch (err) {
        console.log(err);
        res.status(500);
    }
}

exports.delete = async function(req, res) {

    console.log("\nRequest to delete a user's profile image...");

    const userId = req.params.id;

    const leBeanBoy = await user.getUserById(userId);
    if (!leBeanBoy) {
        res.status(404).send();
        return;
    }

    const token = req.headers["x-authorization"];
    const authorizedUserId = await user.findByToken(token);

    if (userId !== authorizedUserId) {
        res.status(403).send();
    }

    try {
        const imageFilename = await user.getImageFilename(userId);
        if (imageFilename == null) {
            res.status(404).send();
        }

        await photo.deleteByFilename(imageFilename);
        await user.setImageFilename(null, userId);

        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

