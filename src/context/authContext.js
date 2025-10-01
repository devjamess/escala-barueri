import { createContext, useState, useEffect } from 'react';
import api from '../constants/api'; // Seu axios configurado
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (matricula_funcionario, senha) => {
    try {
       if (!matricula_funcionario || !senha) {
        Alert.alert('Preencha todos os campos');
        return null;
      }

      if (!/^\d+$/.test(matricula_funcionario)) {
        Alert.alert('Matrícula inválida');
        return null;
      }
      const { data } = await api.post('/loginFuncionario', {
        matricula_funcionario,
        senha,
        
      });
      if (data && data.token) {
     
        setUser(data);
        await AsyncStorage.setItem('@token', data.token);
        await AsyncStorage.setItem('@user', JSON.stringify(data)); 
        return data;
      }
      return null;
    } catch (error) {
      console.error('Erro ao fazer login:', error.message); 
      return null;
    }
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('@user');
  };

    const confirm = async() => {
      const {data} = await api.put(`/confirmacaoEscala/${user.funcionario.matricula_funcionario}`)
      try{
      return data.confirmada
    } catch(error){
      console.error('Erro ao confirmar escala', error.response.data.message)
   }
    }

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('@token');
      if (token) {
      try {
        const decoded = jwtDecode(token);
        // Verifica expiração (exp está em segundos)
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          await signOut();
          Alert.alert('Sessão expirada', 'Faça login novamente.');
          setLoading(false);
          return;
        }
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (e) {
        // Token inválido
        await signOut();
        setLoading(false);
        return;
      }
    }
      const storedUser = await AsyncStorage.getItem('@user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    
  
    loadUser();
    
  }, []);



  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        confirm,
        /*fscales,
        scales,
        fregions,
        regions,
        fteams,
        teams
        //verifyEmail,
        //resetPassword,*/
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
