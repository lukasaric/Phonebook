'use strict';

const router = require('express').Router();
const ContactRoutes = require('./ContactRoutes');

router.use('/contacts', ContactRoutes);

module.exports = router;
