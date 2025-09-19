import { createContext, useState, useEffect } from 'react';
import api from '../constants/api'; // Seu axios configurado
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scales, setScales] = useState([])
  const [regions, setRegions] = useState([])
  const [teams, setTeams] = useState([])




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

      
      if (data) {
        setUser(data); // armazenar mais informações se precisa
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

 /*const verifyEmail = async (email) => {
  try {
    const { data } = await api.post('/home/find-email', { email });
    return data // só retorna true/false
  } catch (error) {
    console.error('Erro ao verificar e-mail:', error.message);
    return false;
  }
};


  const resetPassword = async (email) => {
    // Como você está usando tabela manual, isso depende de como implementou no back
    console.warn('resetPassword ainda não implementado no back-end.');
    return null;
  };
*/
/*
const fscales = async() => {
  try{
    const {data} = await api.get('/escalas')
    setScales(data || [])
    return data
  }catch(error){
    console.error("Erro ao buscar escalas", error.message)
  }
}
const fregions = async() => {
  try{
    const {data} = await api.get('/regiao')
    setRegions(data || [])
    return data
  }catch(error){
    console.error("Erro ao buscar regioes", error.message)
  }
}
const fteams = async() => {
  try{
    const {data} = await api.get('/equipes')
    setTeams(data || [])
    return data
  }catch(error){
    console.error("Erro ao buscar equipes", error.message)
  }
}
*/
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('@user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    
  
    loadUser();
    
  }, []);
/*
  useEffect(() =>{
    fscales();
    fregions();
    fteams();
}, []);
*/
  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
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
