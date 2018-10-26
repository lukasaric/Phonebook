'use strict';

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
  });

  User.associate = (models) => {
    User.hasMany(models.Contact, { foreignKey: 'user_fk' });
  };

  return User;
};
