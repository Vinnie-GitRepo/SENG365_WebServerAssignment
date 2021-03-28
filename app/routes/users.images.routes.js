const user_image = require('../controllers/users.images.controller');

module.exports = function(app) {
    app.route(app.rootUrl + '/users/:user_id/image')
        .get(user_image.read)
        .put(user_image.update)
        .delete(user_image.delete);
}