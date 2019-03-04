'use-strict';

const router = require('express').Router();
const passport = require('passport');
const AuthController = require('../controllers/AuthController');

router.post('/register',
  passport.authenticate('register', { failWithError: true }), (req, res) => {
    res.status(200).send(req.user);
  });

router.post('/login', AuthController.login);

module.exports = router;
