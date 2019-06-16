'use strict';

const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

function hashPassword(user) {
  if (!user.changed('password')) {
    return;
  }

  return bcrypt.hash(user.password, parseInt(process.env.SALT_FACTOR))
    .then((hash) => {
      user.setDataValue('password', hash);
    });
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    googleId: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Contact, { foreignKey: 'UserFk' });
  };

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
