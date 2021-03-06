const events = require('../controllers/events.controller');

module.exports = function(app) {
    app.route(app.rootUrl + '/events')
        .get(events.list)
        .post(events.create);

    app.route(app.rootUrl + '/events/:event_id')
        .get(events.read)
        .patch(events.update)
        .delete(events.delete);

    app.route(app.rootUrl + '/events/categories')
        .get(events.getCategories);
}