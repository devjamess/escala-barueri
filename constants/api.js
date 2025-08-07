import axios from 'axios';

const api = axios.create({ 
    baseURL: 'https://192.168.2.100:3000',
    timeout: 10000,
});

export default api;