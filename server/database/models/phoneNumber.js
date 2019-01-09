'use strict';

module.exports = (sequelize, DataTypes) => {
  const PhoneNumber = sequelize.define('PhoneNumber', {
    number: {
      type: DataTypes.STRING
    },
    numberType: {
      type: DataTypes.ENUM,
      values: ['Fax', 'Private', 'Business']
    },
    isMain: DataTypes.BOOLEAN
  });

  PhoneNumber.associate = (models) => {
    PhoneNumber.belongsToMany(models.Contact, { through: 'numberContact' });
  };

  return PhoneNumber;
};
