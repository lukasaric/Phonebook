'use-strict';

const router = require('express').Router();
const ContactController = require('../controllers/ContactController');

router.post('/addContact', ContactController.AddContact);
router.delete('/deleteContact', ContactController.DeleteContact);
router.post('/editContact', ContactController.EditContact);
router.get('/GetAll', ContactController.GetAllContacts);
router.get('/GetContact/:id/', ContactController.GetContact);
router.delete('DeleteAll', ContactController.DeleteAllContacts);

module.exports = router;
