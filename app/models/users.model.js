const db = require("../../config/db");
const passwordHelper = require("../middleware/password.middleware");
const tokenGenerator = require("rand-token");

exports.create = async function (firstName, lastName, email, password) {
  const queryString =
    "INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";

  try {
    // Crazy regex from https://emailregex.com/
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      console.log("ERROR: email invalid");
      return null;
    }

    const values = [
      firstName,
      lastName,
      email,
      await passwordHelper.hashPassword(password),
    ];

    const result = await db.getPool().query(queryString, values);
    console.log(result);
    return result[0].insertId;
  } catch (err) {
    console.log("ERROR: Duplicate email");
    return null;
  }
};

exports.checkAuthToken = async function(requestAuthToken) {
  const queryString = "SELECT auth_token "
}


exports.updateWithPassword = async function (user_id, firstName, lastName, email, password) {

  const queryString = "UPDATE user SET email = ?, first_name = ?, last_name = ?, password = ? WHERE id = ?";

  try {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      console.log("ERROR: email invalid");
      return null;
    }

    const values = [
      firstName,
      lastName,
      email,
      await passwordHelper.hashPassword(password),
      user_id
    ];

    await db.getPool().query(queryString, values);


  } catch (err) {
    console.log("===================================================");
    console.log(err);
    console.log("===================================================");
    console.log("ERROR: Duplicate email");
    return null;
  }
};

exports.updateWithoutPassword = async function (user_id, firstName, lastName, email) {

  const queryString = "UPDATE user SET email = ?, first_name = ?, last_name = ? WHERE id = ?";

  try {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      console.log("ERROR: email invalid");
      return null;
    }

    const values = [
      firstName,
      lastName,
      email,
      user_id
    ];

    await db.getPool().query(queryString, values);
    return "YeGood";


  } catch (err) {
    console.log("===================================================");
    console.log(err);
    console.log("===================================================");
    console.log("ERROR: Duplicate email");
    return null;
  }
};



exports.getUserById = async function (userId, currentUser = false) {
  const queryString =
    "SELECT first_name, last_name, email FROM user WHERE id = ?";

  try {
    const [result] = await db.getPool().query(queryString, [userId]);
    console.log(result[0]);
    if (currentUser) {
      return {
        firstName: result[0].first_name,
        lastName: result[0].last_name,
        email: result[0].email
      };
    } else {
      return {
        firstName: result[0].first_name,
        lastName: result[0].last_name
      };
    }
  } catch (err) {
    return null;
  }
};


exports.findByEmail = async function (email) {
  const queryString =
    "SELECT id, email, first_name, last_name, password FROM user WHERE email = ?";
  // console.log(email);
  try {
    const result = await db.getPool().query(queryString, [email]);
    if (result.length < 1) {
      return null;
    } else {
      // console.log(result);
      // console.log("===============================================");
      // console.log(result[0][0]);
      // console.log("===============================================");
      return result[0][0];
    }
  } catch (err) {
    console.log("ERROR: findByEmail");
    return null;
  }
};


exports.setAuthToken = async function (userId) {
  const queryString = "UPDATE user SET auth_token = ? WHERE id = ?";

  const auth_token = tokenGenerator.generate(32);
  const values = [auth_token, userId];

  try {
    const result = await db.getPool().query(queryString, values);
    console.log(result);
    return [result, auth_token];
  } catch (err) {
    return null;
  }
};


exports.findByToken = async function (authToken) {
  const queryString = "SELECT id FROM user WHERE auth_token = ?";

  try {
    const authorizedUserId = await db.getPool().query(queryString, authToken);
    return authorizedUserId[0][0].id;
  } catch (err) {
    return null;
  }
};


exports.logout = async function (authorizedUserId) {
  const queryString = "UPDATE user SET auth_token = NULL WHERE id = ?";
  await db.getPool().query(queryString, authorizedUserId);
};
