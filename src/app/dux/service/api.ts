import axios from 'axios';
export const api = axios.create({
  baseURL: '/json',
  timeout: 1000,
  headers: {}
});
