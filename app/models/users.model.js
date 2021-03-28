const db = require('../../config/db');


exports.create = async function(firstName, lastName, email, password) {

    const queryString = 'INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';

    const values = [firstName, lastName, email, password];
    const conn = await db.getPool().getConnection();
    const result = await conn.query(queryString, values);
    return result.insertId;
}

exports.update = async function(user_id, firstName, lastName, email, password, currentPassword) {

    const queryString = 'UPDATE user SET ? WHERE id = ?';

    if (password === currentPassword) {
    //    Hash Password
    }
    const values = [firstName, lastName, email, password];
    const conn = await db.getPool().getConnection();
    await conn.query(queryString, values);

}

exports.getUserById = async function(user_id, isCurrentUser = false) {
    const queryString = 'SELECT first_name, last_name, email FROM user WHERE id = ?';

    const conn = await db.getPool().getConnection();
    const result = await conn.query(queryString, [user_id]);
    return result;
}

exports.login = async function() {

}

exports.logout = async function() {

}