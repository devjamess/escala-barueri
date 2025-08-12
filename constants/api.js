import axios from 'axios';

const api = axios.create({ 
    baseURL: 'https://backend-test-54i9.onrender.com',
    timeout: 10000,
});

export default api;