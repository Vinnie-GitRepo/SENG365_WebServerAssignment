
const fs = require('mz/fs');
const tokenGenerator = require('rand-token');


const imagePath = "./storage/images/"

function getMimeType(filename) {
    let mimeType = "image/gif";
    if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
        mimeType = "image/jpeg";
    } else if (filename.ends(".png")) {
        mimeType = "image/png";
    }
    return mimeType;
}


exports.store = async function(image, fileExtension) {
    const filename = tokenGenerator.generate(32) + fileExtension;

    try {
        await fs.writeFile(imagePath + filename, image);
        return filename;
    } catch (err) {
        console.log(err);
        fs.unlink(imagePath + filename, (err => {console.log(err)})).catch(err => console.error(err));
    }
}


exports.retrieveByFilename = async function(filename) {
    try {
        const imageExists = await fs.exists(imagePath + filename, (err => {console.log(err)}))
        if (imageExists) {
            const image = await fs.readFile(imagePath + filename, (err => {console.log(err)}));
            const mimeType = getMimeType(filename);
            return {image, mimeType};
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
    }
}


exports.deleteByFilename = async function(filename) {
    try {
        const imageExists = await fs.exists(imagePath + filename);
        if (imageExists) {
            await fs.unlink(imagePath + filename, (err => {console.log(err)}));
        }
    } catch (err) {
        console.log(err);
    }
}