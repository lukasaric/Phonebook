'use strict';

module.exports = (sequelize, DataTypes) => {
  const PhoneNumber = sequelize.define('PhoneNumber', {
    number: {
      type: DataTypes.INTEGER,
      unique: true
    },
    numberType: {
      type: DataTypes.ENUM,
      values: ['Fax', 'Private', 'Business']
    },
    isMain: DataTypes.BOOLEAN
  });

  PhoneNumber.associate = (models) => {
    PhoneNumber.belongsToMany(models.Contact, {
      through: 'numberContact',
      foreignKey: 'phoneNumber_fk'
    });
  };

  return PhoneNumber;
};
