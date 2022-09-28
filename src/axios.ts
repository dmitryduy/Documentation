import axios from 'axios';

const BASE_URL = 'http://localhost:5000' ||  'https://safe-mountain-10143.herokuapp.com';

export default axios.create({
  baseURL: BASE_URL
});