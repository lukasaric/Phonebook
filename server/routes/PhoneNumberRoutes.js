'use-strict';

const router = require('express').Router();
const PhoneNumberController = require('../controllers/PhoneNumberController');

router.post('/addNumber', PhoneNumberController.Add);
router.post('/deleteNumber', PhoneNumberController.Delete);
router.post('/editNumber', PhoneNumberController.Edit);

module.exports = router;
