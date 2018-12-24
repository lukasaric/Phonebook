'use-strict';

const Contact = require('../database').Contact;
const PhoneNumber = require('../database').PhoneNumber;

module.exports = {
  AddContact: ({ body: { firstName, lastName, email, PhoneNumbers } }, res, next) => {
    return Contact.create({ firstName, lastName, email })
      .then(contact => {
        return PhoneNumber.bulkCreate(PhoneNumbers.map(phoneNumber => {
          const { number, numberType, isMain } = phoneNumber;
          return { number, numberType, isMain };
        }), {returning: true})
          .then(numbers => contact.setPhoneNumbers(numbers));
      })
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  },
  GetAllContacts: (req, res, next) => {
    return Contact.findAll({ include: [ PhoneNumber ] })
      .then(contacts => {
        return contacts.map(contact => {
          const { id, firstName, lastName, email } = contact.dataValues;
          const numbers = contact.dataValues.PhoneNumbers.map(phoneNumber => {
            const { id, number, numberType, isMain } = phoneNumber;
            return { id, number, numberType, isMain };
          });
          return { id, firstName, lastName, email, phoneNumbers: numbers };
        });
      })
      .then(contacts => res.status(200).json(contacts))
      .catch(err => next(err));
  },
  GetContact: ({ params: { id } }, res, next) => {
    return Contact.find({ where: { id }, include: [ PhoneNumber ] })
      .then(contact => {
        const { id, firstName, lastName, email, PhoneNumbers } = contact.dataValues;
        return { id, firstName, lastName, email, PhoneNumbers };
      })
      .then(contact => {
        contact.PhoneNumbers = contact.PhoneNumbers.map(phoneNumber => {
          const { id, number, numberType, isMain } = phoneNumber;
          return { id, number, numberType, isMain };
        });
        return contact;
      })
      .then(reducedContact => res.status(200).json(reducedContact))
      .catch(err => next(err));
  },
  DeleteContact: ({ query: { id } }, res, next) => {
    return Contact.find({ where: { id }, include: [ PhoneNumber ] })
      .then(contact => {
        contact.dataValues.PhoneNumbers.forEach(number => {
          PhoneNumber.destroy({ where: { id: number.dataValues.id } });
        });
        contact.destroy();
      })
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  },
  EditContact: ({ body: { id, firstName, lastName, email, PhoneNumbers } }, res, next) => {
  },
  DeleteAllContacts: (req, res, next) => {
    const options = { where: {}, truncate: { cascade: true } };
    return Contact.destroy(options)
      .then(() => PhoneNumber.destroy(options))
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  }
};
