const users = require('../controllers/users.controller');

module.exports = function(app) {
    app.route('/api/users/:user_id')
        .get(users.read)
        .patch(users.update);

    app.route('api/users/register')
        .post(users.register);

    app.route('api/users/login')
        .post(users.login);

    app.route('api/users/logout')
        .post(users.logout);
}