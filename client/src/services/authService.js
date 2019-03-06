import Api from '@/services/api';

export default {
  login(credentials) {
    return Api.post('/auth/login', credentials);
  },
  register(credentials) {
    return Api.post('/auth/register', credentials);
  }
};
