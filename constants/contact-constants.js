const CONTACT_NOT_CREATED = "Internal server error creating contact.";
const CONTACT_EXISTS = "A contact with that name already exists.";
const CONTACT_NOT_FOUND = "Couldn't find any contact(s).";
const CONTACT_NOT_UPDATED = "Internal server error updating contact.";
const CONTACT_NOT_DELETED = "Internal server error deleting contact.";
const BAD_CREATE_CONTACT_REQUEST = `Your request body should include 'name', 'phone', 'email' and 'message' properties.`;
const BAD_UPDATE_CONTACT_REQUEST = `Your request body should include at least one of these properties: 'name', 'phone', 'email', 'message'.`;
const GOT_CONTACT = "Successfully fetched contact(s).";
const CREATED_CONTACT = "Successfully created a contact.";
const UPDATED_CONTACT = (id) => `Successfully updated contact with id of ${id}`;
const DELETED_CONTACT = (id) => `Successfully deleted contact with id of ${id}`;

module.exports = {
  CONTACT_NOT_CREATED,
  CONTACT_EXISTS,
  CONTACT_NOT_FOUND,
  CONTACT_NOT_UPDATED,
  CONTACT_NOT_DELETED,
  BAD_CREATE_CONTACT_REQUEST,
  BAD_UPDATE_CONTACT_REQUEST,
  GOT_CONTACT,
  CREATED_CONTACT,
  UPDATED_CONTACT,
  DELETED_CONTACT,
};
