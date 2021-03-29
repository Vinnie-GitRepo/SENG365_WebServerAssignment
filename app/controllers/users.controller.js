const user = require("../models/users.model");
const passwordHelper = require("../middleware/password.middleware");

/**
 *
 * @param req
 * @param res
 * @returns 201 {"userId": (id)}, 400, 500
 */
exports.register = async function (req, res) {
  console.log("\nRequest to register a new user...");

  try {
    const user_id = await user.create(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password
    );

    if (user_id === null) {
      res.status(400).send();
    } else {
      console.log(user_id);
      res.status(201).send({ userId: user_id });
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
exports.login = async function (req, res) {
  console.log("\nRequest to log in an existing user...");

  try {
    const currentUser = await user.findByEmail(req.body.email);
    // console.log(req.body)
    // console.log(currentUser);
    if (currentUser === null) {
      console.log("ERROR: currentUser is null");
      res.status(400).send();
    }

    const correctPassword = await passwordHelper.compare(
      req.body.password,
      currentUser[0].password
    );
    if (!correctPassword) {
      console.log("ERROR: incorrect password");
      res.status(400).send();
    }

    const result = await user.setAuthToken(currentUser[0].id);
    if (result === null) {
      console.log("ERROR: auth_token issue");
      res.status(400).send();
    }

    res.status(200).send({
      userId: currentUser[0].id,
      token: result[1],
    });
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
  res.status(500).send();
};

/**
 * @param req
 * @param res
 * @returns 200, 401, 500
 */
exports.logout = async function (req, res) {
  console.log("\nRequest to log out a currently authorised user...");

  const token = req.headers["x-authorization"];

  const authorizedUserId = await user.findByToken(token);

  if (authorizedUserId === null) {
    res.status(401).send();
  }

  try {
    await user.logout(authorizedUserId);
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

/**
 * @param req
 * @param res
 * @returns 200 {"firstName": (fname), ""},
 */
exports.read = async function (req, res) {
  console.log("\nRequest to retrieve information about a user...");

  const userId = req.params.user_id;

  const token = req.headers["x-authorization"];
  const authorizedUserId = await user.findByToken(token);

  if (authorizedUserId === userId) {
  }

  try {
    if (authorizedUserId === userId) {
      const userData = await user.getUserById(userId, true);
      if (userData === null || userData.length === 0) {
        res.status(404).send();
      }
      res.status(200).send(userData);
    } else {
      const userData = await user.getUserById(userId);
      if (userData === null || userData.length === 0) {
        res.status(404).send();
      }
      res.status(200).send(userData);
    }
    // if (userData === null || userData.length === 0) {
    //   res.status(404).send();
    // }
    // res.status(200).send(userData);
  } catch (err) {
    res.status(500).send();
  }
};

exports.update = async function (req, res) {
  console.log("\nRequest to change a user's details...");
  res.status(500).send();
};
