const event_attendees = require('../controllers/events.attendees.controller')

module.exports = function(app) {
    app.route(app.rootUrl + '/events/:event_id/attendees')
        .get(event_attendees.list)
        .post(event_attendees.create)
        .delete(event_attendees.delete);

    app.route(app.rootUrl + '/events/:event_id/attendees/:user_id')
        .patch(event_attendees.update);
}