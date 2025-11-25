import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({ 
    baseURL: 'https://backend-escala-barueri-semurb.vercel.app',
    timeout: 10000,
});
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    } catch (error) {
      console.error('Erro ao adicionar token:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta - trata erros e tokens expirados
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Se for erro 401 e não for tentativa de retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Aqui você pode tentar renovar o token se tiver refresh token
        // ou simplesmente fazer logout
        await AsyncStorage.removeItem('@token');
        await AsyncStorage.removeItem('@user');
        
        // Redirecionar para login (você precisará importar navegação)
        // navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        

        return Promise.reject(error);
      } catch (refreshError) {
        console.error('Erro ao renovar sessão:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
