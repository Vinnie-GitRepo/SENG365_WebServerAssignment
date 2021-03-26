const events = require('../controllers/events.controller');

module.exports = function(app) {
    app.route('/api/events')
        .get(events.list)
        .post(events.create);

    app.route('/api/events/:event_id')
        .get(events.read)
        .patch(events.update)
        .delete(events.delete);

    app.route('/api/events/categories')
        .get(events.readCategories);
}