const event_image = require('../controllers/events.images.controller');

module.exports = function(app) {
    app.route('/api/events/:event_id/image')
        .get(event_image.read)
        .put(event_image.update);
}