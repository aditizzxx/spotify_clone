import axios from 'axios';

const instanceAPI = axios.create({
  baseURL: 'http://universities.hipolabs.com',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default instanceAPI;
