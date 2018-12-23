import Api from '@/services/api';

export default {
  addContact(data) {
    return Api.post('/contacts/addContact', data);
  },
  DeleteContact(data) {
    return Api.delete('/contacts/deleteContact', { params: { id: data } });
  },
  EditContact(data) {
    return Api.post('/contacts/editContact', data);
  },
  GetAllContacts() {
    return Api.get('/contacts/GetAll');
  },
  DeleteAllContacts() {
    return Api.post('/contacts/DeleteAll');
  }
};
