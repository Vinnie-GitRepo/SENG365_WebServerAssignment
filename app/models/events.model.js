const db = require("../../config/db");
const camelcaseKeys = require("camelcase-keys");

exports.findById = async function (eventId) {
  // const queryString = `SELECT event.id, title, description, date, image_filename, is_online, url, venue, capacity, requires_attendance_control, fee, organizer_id, category_id, category.name FROM event INNER JOIN event_category ON event.id=event_category.event_id INNER JOIN category ON event_category.category_id=category.id WHERE event.id = ?`;
  const queryString = `SELECT event.id AS eventId, title, GROUP_CONCAT(DISTINCT event_category.category_id) AS categories, user.first_name AS organizer_first_name, user.last_name AS organizer_last_name, COUNT(event_attendees.user_id) AS numAcceptedAttendees, capacity, description, organizer_id, date, is_online, url, venue, CASE WHEN requires_attendance_control = 1 THEN "true" ELSE false END AS requires_attendance_control, fee FROM event INNER JOIN event_category ON event.id=event_category.event_id INNER JOIN user ON event.organizer_id=user.id INNER JOIN event_attendees ON event_attendees.event_id=event.id WHERE event.id = ?`;


  const [result] = await db.getPool().query(queryString, [eventId]);
  console.log(camelcaseKeys(result[0]));
  const postQ = camelcaseKeys(result[0]);
  postQ.categories = postQ.categories.split(",");
  postQ.categories = postQ.categories.map(c => parseInt(c));
  postQ.requiresAttendanceControl = postQ.requiresAttendanceControl === "true";
  postQ.isOnline = postQ.isOnline === 1;
  return postQ;
};
