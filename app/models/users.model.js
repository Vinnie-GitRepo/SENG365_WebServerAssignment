const db = require('../../config/db');
const passwordHelper = require('../middleware/password.middleware');


exports.create = async function(firstName, lastName, email, password) {

    const queryString = 'INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';

    const values = [
        firstName,
        lastName,
        email,
        await passwordHelper.hashPassword(password)
    ];

    const result = await db.getPool().query(queryString, values);
    console.log(result);
    return result[0].insertId;
}

exports.update = async function(user_id, firstName, lastName, email, password, currentPassword) {

    const queryString = 'UPDATE user SET ? WHERE id = ?';

    const values = [
        firstName,
        lastName,
        email,
        await passwordHelper.hashPassword(password)
    ];

    await db.getPool().query(queryString, values);
}

exports.getUserById = async function(user_id, isCurrentUser = false) {
    const queryString = 'SELECT first_name, last_name, email FROM user WHERE id = ?';

    const conn = await db.getPool().getConnection();
    const result = await conn.query(queryString, [user_id]);
    conn.release();
    return result;
}

exports.login = async function() {

}

exports.logout = async function() {

}