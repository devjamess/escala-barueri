import { createContext, useState, useEffect } from 'react';
import api from '../constants/api'; // Seu axios configurado
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from "jwt-decode";
import { useRouter } from 'expo-router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [holidays, setHolidays] = useState([])
  const [reminders, setReminders] = useState([])
  const route = useRouter()


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
        return { result: data, error: null}
      }
       
    } catch (error) {
      const erro = error?.message
      console.error('Erro ao fazer login:', erro);
      return {result: null, error: erro}
    }
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('@user');
    const token = await AsyncStorage.removeItem('@token');
    delete api.defaults.headers.common['Authorization'];
    route.replace('/'); // Redireciona para a tela de login
  };

  const confirm = async () => {
    try {
      if (!user?.funcionario?.matricula_funcionario) {
        console.error('Matrícula do funcionário não encontrada');
        return null;
      }

      const { data } = await api.put(
        `/confirmacaoEscala/${user.funcionario.matricula_funcionario}`
      );


      // Atualizar o user no estado com o novo status
      const updatedUser = {
        ...user,
        confirmacaoEscala: {
          ...user?.confirmacaoEscala,
          status: data.confirmada?.status || 'Confirmado'
        }
      };

      setUser(updatedUser);

      // Atualizar no AsyncStorage também
      await AsyncStorage.setItem('@user', JSON.stringify(updatedUser));

      return {result:data.confirmada, error:null};
    } catch (error) {
      const erro = error.response?.data?.message
      console.error('Erro ao confirmar escala:', erro);
      return { result:null, error: erro };
    }
  };

  const updateProfile = async (user, payload) => {
    try {
      const { data } = await api.put(`/editarInformacoes/${user?.funcionario?.matricula_funcionario}`, {
        ...payload
      })
      if (data) {
//Atualizar o user no estado com o novo status
        const updatedUser = {
          ...user,
          funcionario: {
            ...user?.funcionario,
            email: payload.email,
            telefone: payload.telefone
          }
        };
        setUser(updatedUser);
        // Atualizar no AsyncStorage também
        await AsyncStorage.setItem('@user', JSON.stringify(updatedUser));
      }

      const sucess = 'Alterações salvas com sucesso!'
      return { result: data, error: null, sucess: sucess }
    } catch (error) {
      const erro = error.response?.data?.mensagem 
      console.error('Erro ao alterar informações: ', erro)
      return { result: null, error: erro, sucess: null }
    }
  }
  
  const updatePassword = async(user, payload) =>{
    try{
      const {data} = await api.put('/alterarSenha',{
        matricula_funcionario: user?.funcionario?.matricula_funcionario,
        ...payload
      })
      const sucess = 'Senha altearada com sucesso!'
      return {result: data, error: null, sucess:sucess}
    }catch(error){
      const erro = error?.response?.data?.message
      console.error('Erro ao alterar senha: ', erro)
      return { result:null, error:erro, sucess:null}
    }
  }

  const verifyEmail = async(email)=>{
    try{
      const {data} = await api.post('/envioVerificacao_email', { email });
      return {result: data, error: null};
    }catch(error){
      const erro = error?.response?.data?.mensagem
      console.error('Erro ao verificar e-mail: ', erro)
      return { result:null, error:erro };
    }
  }

  const verifyCode = async(email)=>{
    try{
      const {data} = await api.post('/verificacaoCodigo', { email });
      return {result: data, error: null};
    }catch(error){
      const erro = error?.response?.data?.message
      console.error('Erro ao verificar e-mail: ', erro)
      return { result:null, error:erro };
    }
  }

  const updatePasswordByEmail = async(email, payload) =>{}

  const holidaysList = async() =>{
    try{
    const {data} = await api.get('/listarFeriados_master')
    if(data?.feriados){
    setHolidays(data.feriados)
    }
    return data.feriados;
    }catch(error){
      const erro = error?.response?.data?.mensagem || error.message
      console.error('Erro ao obter feriados: ', erro)
    }
  }

  const remindersList = async() => {
    try{
      const {data} = await api.get('/diasEspecificos')
      if(data?.diasEspecificos){
        setReminders(data.diasEspecificos)
      }
      return data.diasEspecificos;
    }catch(error){
      const erro = error?.response?.data?.mensagem || error.message
      console.error('Erro ao obter esporadicações: ', erro)
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

  useEffect(()=>{
    holidaysList()
    remindersList()
  },[user])


  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        confirm,
        updateProfile,
        updatePassword,
        verifyEmail,
        holidaysList,
        holidays,
        remindersList,
        reminders,
        /*fscales,
        scales,
        fregions,
        regions,
        fteams,
        teams
        
        //resetPassword,*/
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
