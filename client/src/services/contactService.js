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
  GetAllContacts(UserFk) {
    return Api.get('/contacts/GetAll', { params: { UserFk } });
  },
  GetContact(id) {
    return Api.get(`/contacts/GetContact/${id}`);
  },
  DeleteAllContacts(UserFk) {
    return Api.post('/contacts/DeleteAll', { params: { UserFk } });
  }
};
