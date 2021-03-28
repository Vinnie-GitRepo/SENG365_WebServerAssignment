const bcrypt = require('bcrypt');

exports.hashPassword = async function(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

exports.compare = async function(password, hash) {
    return await bcrypt.compare(password, hash);
}