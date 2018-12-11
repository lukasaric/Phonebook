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
    Contact.belongsToMany(models.PhoneNumber, {
      through: {
        model: 'numberContact',
        unique: false
      },
      foreignKey: 'contact_fk',
      constraints: false
    });
    Contact.belongsTo(models.User, { foreignKey: 'user_fk' });
  };

  return Contact;
};
