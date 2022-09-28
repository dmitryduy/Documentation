import axios from 'axios';

const BASE_URL = 'https://safe-mountain-10143.herokuapp.com';

export default axios.create({
  baseURL: BASE_URL
});