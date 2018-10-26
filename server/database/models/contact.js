'use strict';

module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  });

  Contact.associate = (models) => {
    Contact.belongsToMany(models.PhoneNumber, {
      through: 'numberContact',
      foreignKey: 'contact_fk'
    });
    Contact.belongsTo(models.User, { foreignKey: 'user_fk' });
  };

  return Contact;
};
