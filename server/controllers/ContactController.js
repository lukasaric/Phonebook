'use-strict';
const Contact = require('../database').Contact;
const PhoneNumber = require('../database').PhoneNumber;

module.exports = {
  Add: (req, res) => {
    const contact = req.body;
    Contact.create({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email
    }, { raw: true })
      .then(contactDb => {
        contact.phoneNumbers.forEach(el => {
          PhoneNumber.create({
            number: el.number, numberType: el.type, isMain: el.isMain
          }, { raw: true })
            .then(numberDb => {
              contactDb.addPhoneNumber(numberDb);
              numberDb.addContact(contactDb);
            })
            .catch((err) => console.log(err));
        });
      }).then(() => {
        return res.status(200);
      }).catch(() => res.status(500));
  },
  Delete: (req, res) => {

  },
  Edit: (req, res) => {
  }
};
