import axios from 'axios';

const BASE_URL = 'https://crowded-tie-calf.cyclic.app';

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