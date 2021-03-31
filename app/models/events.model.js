const db = require("../../config/db");
const camelcaseKeys = require("camelcase-keys");

exports.findByParams = async function (params) {
  const start = params.startIndex; //where id >= startIndex AND id <= startIndex + count (maybe add before using in query)
  const end = start + params.count;
  const searchTerm = params.q;
  const categoryIds = params.categoryIds;
  const organizerId = params.organizerId;
  const ordering = params.sortBy;
  // const queryString = `SELECT event.id, title, description, date, image_filename, is_online, url, venue, capacity, requires_attendance_control, fee, organizer_id, category_id, category.name FROM event INNER JOIN event_category ON event.id=event_category.event_id INNER JOIN category ON event_category.category_id=category.id WHERE event.id = ?`;
  // const queryString = `SELECT event.id AS eventId, title, GROUP_CONCAT(DISTINCT event_category.category_id) AS categories, user.first_name AS organizer_first_name, user.last_name AS organizer_last_name, COUNT(event_attendees.user_id) AS numAcceptedAttendees, capacity, description, organizer_id, date, is_online, url, venue, CASE WHEN requires_attendance_control = 1 THEN "true" ELSE false END AS requires_attendance_control, fee FROM event INNER JOIN event_category ON event.id=event_category.event_id INNER JOIN user ON event.organizer_id=user.id INNER JOIN event_attendees ON event_attendees.event_id=event.id WHERE event.id >= ? AND event.id <= ?`;
  let queryString = `SELECT event.id AS eventId, title, GROUP_CONCAT(DISTINCT event_category.category_id) AS categories, user.first_name AS organizer_first_name, user.last_name AS organizer_last_name, COUNT(event_attendees.user_id) AS numAcceptedAttendees, capacity, description, organizer_id, date, is_online, url, venue, CASE WHEN requires_attendance_control = 1 THEN "true" ELSE false END AS requires_attendance_control, fee FROM event INNER JOIN event_category ON event.id=event_category.event_id INNER JOIN user ON event.organizer_id=user.id INNER JOIN event_attendees ON event_attendees.event_id=event.id `;

  let queryValues = [];
  let queryConditions = [];

  if (start) {
    queryConditions.push("event.id >= ?");
    queryValues.push(start);
  }

  if (end) {
    queryConditions.push("event.id <= ?");
    queryValues.push(end);
  }

  if (searchTerm) {
    queryConditions.push("title LIKE ? OR description LIKE ?");
    queryValues.push(searchTerm);
    queryValues.push(searchTerm);
  }

  if (categoryIds) {
    queryConditions.push("categories IN ?");
    queryValues.push(categoryIds);
    // let i;
    // for (i = 0; i < categoryIds.length; i++) {
    //   queryConditions.push("? IN categories");
    //   queryValues.push(categoryIds[i]);
    // }
    console.log(categoryIds)
  }

  if (organizerId) {
    queryConditions.push("organizer_id = ?");
    queryValues.push(organizerId);
  }

  if (queryConditions.length) {
    queryString += `WHERE ${(queryConditions ? queryConditions.join(" AND ") : 1)}`
  }

  if (ordering) {
    queryString += " ORDER BY ?"
    queryValues.push(ordering);
  }

  const [result] = await db.getPool().query(queryString, queryValues);
  console.log(camelcaseKeys(result[0]));

  const postQ = camelcaseKeys(result[0]);
  if (postQ.categories) {
    postQ.categories = postQ.categories.split(",");
    postQ.categories = postQ.categories.map(c => parseInt(c));
  }
  postQ.requiresAttendanceControl = postQ.requiresAttendanceControl === "true";
  postQ.isOnline = postQ.isOnline === 1;
  return postQ;
};

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
