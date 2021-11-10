import axios from 'axios';

const httpClient = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export { httpClient };
