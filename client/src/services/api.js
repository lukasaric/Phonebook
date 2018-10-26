import axios from 'axios';

axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: 'api/'
});
