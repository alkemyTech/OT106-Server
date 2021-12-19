const { getContact, getAllContacts, createContact, updateContact, deleteContact } = require('../combinations/contact-combination');

const router = require('express').Router();

// GET
router.get('/:id', getContact);
router.get('/', getAllContacts);

// POST
router.post('/', createContact);

// PATCH
router.patch('/:id', updateContact);

// DELETE
router.delete('/:id', deleteContact);

module.exports = router;
