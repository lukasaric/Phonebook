'use-strict';

const router = require('express').Router();
const ContactController = require('../controllers/ContactController');

router.post('/addContact', ContactController.Add);
router.post('/deleteContact', ContactController.Delete);
router.post('/editContact', ContactController.Edit);

module.exports = router;
