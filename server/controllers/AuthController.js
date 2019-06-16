'use strict';

const passport = require('passport');
const jwt = require('jsonwebtoken');

function createToken(user, expiresIn = '2d') {
  return jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn });
}

module.exports = {
  login: (req, res) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : 'Login failed.',
          user
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) res.send(err);
        const token = createToken(user);
        const userCredentials = { id: user.id, email: user.email };
        user = Object.assign({}, userCredentials, { token });
        const message = 'Successfully logged in.';
        return res.status(200).json({ user, message });
      });
    })(req, res);
  }
};
