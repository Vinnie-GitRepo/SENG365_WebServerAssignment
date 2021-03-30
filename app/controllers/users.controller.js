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
    if (currentUser === null) {
      console.log("ERROR: currentUser is null");
      res.status(400).send();
    }

    const correctPassword = await passwordHelper.compare(
      req.body.password,
      currentUser.password
    );

    if (!correctPassword) {
      console.log("ERROR: incorrect password");
      res.status(400).send();
    }

    const result = await user.setAuthToken(currentUser.id);
    if (result === null) {
      console.log("ERROR: auth_token issue");
      res.status(400).send();
    }

    res.status(200).send({
      userId: currentUser.id,
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
  // console.log(req.params);

  const token = req.headers["x-authorization"];
  const authorizedUserId = await user.findByToken(token);

  try {
    if (authorizedUserId == userId) {
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
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

/**
 * @param req
 * @param res
 * @returns 200 - valid user data provided and correct X-Auth token
 *          400 - invalid user data provided
 *          401 - valid user data provided but NULL X-Auth token
 *          403 - valid user data provided but different X-Auth token
 *          404 - valid user data provided but no match to existing user
 *          500 - any other condition
 */
exports.update = async function (req, res) {
  console.log("\nRequest to change a user's details...");

  const userId = req.params.user_id;
  const modificationData = req.body;
  const token = req.headers["x-authorization"];

  const userExists = (await user.getUserById(userId)) !== null;
  if (!userExists) {
    res.status(404).send();
  }

  if (token === null || token === "undefined" || token === undefined) {
    res.status(401).send();
  }

  const modifyingSelf = (await user.findByToken(token));
  if (!modifyingSelf) {
    res.status(401).send();
  }

  if (!(modifyingSelf == userId)) {
    res.status(403).send();
  }





  if (
    modificationData.password === "" ||
    !modificationData.password ||
    modificationData.password === "undefined"
  ) {
    res.status(400).send();
  }

  try {

    if(!!modificationData.firstName) {
      await user.updateFirstName(modificationData.firstName, userId);
    }

    if(!!modificationData.lastName) {
      await user.updateLastName(modificationData.lastName, userId);
    }

    if(!!modificationData.email) {
      if (!modificationData.email.includes("@")) {
        res.status(400).send();
      }
      await user.updateEmail(modificationData.email, userId);
    }

    if(!!modificationData.password) {
      if (!modificationData.currentPassword) {
        res.status(400).send();
      }
      await user.updatePassword(await passwordHelper.hashPassword(modificationData.password), userId);
    }
    res.status(200).send();

    // if (modificationData.password === modificationData.currentPassword) {
    //   const result = await user.updateWithoutPassword(userId, modificationData.firstName, modificationData.lastName, modificationData.email
    //   );
    //   if (result === null) {
    //     res.status(405).send();
    //   }
    //   res.status(200).send();
    // } else {
    //   const result = await user.updateWithPassword(userId, modificationData.firstName, modificationData.lastName, modificationData.email, modificationData.password
    //   );
    //   if (result === null) {
    //     res.status(406).send();
    //   }
    //   res.status(200).send();
    // }
  } catch (err) {
    res.status(500).send();
  }
};
