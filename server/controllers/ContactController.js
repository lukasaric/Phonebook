'use-strict';

const Contact = require('../database').Contact;
const PhoneNumber = require('../database').PhoneNumber;

module.exports = {
  AddContact: ({ body: { firstName, lastName, email, phoneNumbers } }, res, next) => {
    return Contact.create({ firstName, lastName, email })
      .then(contact => {
        return PhoneNumber.bulkCreate(phoneNumbers.map(phoneNumber => {
          const { number, type: numberType, isMain } = phoneNumber;
          return { number, numberType, isMain };
        }), {returning: true})
          .then(numbers => contact.setPhoneNumbers(numbers));
      })
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  },
  GetAllContacts: (req, res) => {
  },
  GetContact: (req, res) => {
  },
  DeleteContact: (req, res) => {
  },
  EditContact: (req, res) => {
  },
  DeleteAllContacts: (req, res) => {
  }
};
