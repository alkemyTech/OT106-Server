const TESTIMONIAL_NOT_CREATED = "Internal server error creating testimonial.";
const TESTIMONIAL_EXISTS = "A testimonial with that name already exists.";
const TESTIMONIAL_NOT_FOUND = "Couldn't find any testimonial(s).";
const TESTIMONIAL_NOT_UPDATED = "Internal server error updating testimonial.";
const TESTIMONIAL_NOT_DELETED = "Internal server error deleting testimonial.";
const BAD_CREATE_TESTIMONIAL_REQUEST = `Your request body should include "name", "image", and "content" properties.`;
const BAD_UPDATE_TESTIMONIAL_REQUEST = `Your request body should include at least one of these properties: "name", "image", "content".`;
const MISSING_TESTIMONIAL_ID = "Your request is missing a testimonial id.";

module.exports = {
  TESTIMONIAL_NOT_CREATED,
  TESTIMONIAL_EXISTS,
  TESTIMONIAL_NOT_FOUND,
  TESTIMONIAL_NOT_UPDATED,
  TESTIMONIAL_NOT_DELETED,
  BAD_CREATE_TESTIMONIAL_REQUEST,
  BAD_UPDATE_TESTIMONIAL_REQUEST,
  MISSING_TESTIMONIAL_ID,
};
