const bcrypt = require('bcrypt');

exports.hashPassword = async function(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

exports.compare = async function(password, hash) {
    console.log(password)
    console.log(hash)
    if (password === hash) {
        return true;
    }
    return await bcrypt.compare(password, hash);
}