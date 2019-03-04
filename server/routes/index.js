'use strict';

const router = require('express').Router();
const ContactRoutes = require('./ContactRoutes');
const AuthRoutes = require('./AuthRoutes');
const passport = require('passport');

const authenticate = passport.authenticate('jwt', { session: false });

router.use('/contacts', authenticate, ContactRoutes);
router.use('/auth', AuthRoutes, handleError);

function handleError(err, req, res, next) {
  let message = '';
  if (err.status === 500) return res.status(500);
  if (err.name === 'AuthenticationError') message = 'User already exists.';
  if (err.name === 'SequelizeValidationError') message = 'Invalid input form.';
  res.status(401).send({ message });
}

module.exports = router;
