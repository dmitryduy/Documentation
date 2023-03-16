import axios from 'axios';

const BASE_URL = 'https://documentation-gm10.onrender.com';

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