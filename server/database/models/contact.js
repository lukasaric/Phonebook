'use strict';

module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  });

  Contact.associate = (models) => {
    Contact.belongsToMany(models.PhoneNumber, { through: 'numberContact' });
    Contact.belongsTo(models.User, { foreignKey: 'UserFk' });
  };

  return Contact;
};
