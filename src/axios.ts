import axios from 'axios';

const BASE_URL = 'http://localhost:5000' || 'https://safe-mountain-10143.herokuapp.com';

const instance = axios.create({
  baseURL: BASE_URL
});

instance.interceptors.request.use(config => {
  if (config.headers) {
    config.headers.Authorization = window.localStorage.getItem('auth-token') || '';
  }
  return config;
});

export default instance;