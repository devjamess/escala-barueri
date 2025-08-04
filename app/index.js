import { Alert, View, SafeAreaView, Platform, ScrollView, Text, Pressable, Image, ImageBackground, TextInput, KeyboardAvoidingView } from 'react-native';
import { Link, useRouter, } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../hook/useAuth'; 
import {styles} from '../constants/layout-login';



export default function Login() {
  const route = useRouter();

/*
  const { signIn, user } = useAuth();
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  const handleSignIn = async () => {
    const userLogado = await signIn(matricula, senha);
    if (userLogado) {
      route.push('/main', { isOpen: true });
    } else {
      Alert.alert('Erro ao fazer login', 'Verifique suas credenciais e tente novamente.');
    }
  };
*/

/*
  const [registration, setRegistration] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn(){
    setLoading(true);

    const { data, error } = await supabase.auth.signIn({
      registration: registration,
      password: password,
    })

    if (error) {
      Alert.alert('Erro ao fazer login', error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    route.push('/main', { isOpen: true });
  }
*/

  const [registration, setRegistration] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {

    if (registration === '' || password === '') {
      Alert.alert('Preencha todos os campos');
      return;
    }

    if (!/^\d+$/.test(password) || !/^\d+$/.test(registration)) {
      Alert.alert('Credenciais inválidas!', 'deve conter apenas números');
      return
    }

    route.push('/main', { isOpen: true });

  }


  return (
  
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVErticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'

        >
          <View style={{ flex: 1}}>

            <ImageBackground
              source={require('../assets/images/background-login.png')}
              style={styles.fundoContainer}
            />

            <View style={styles.logoImage}>
              <Image source={require('../assets/images/semurb-logo-login.png')} />
              <Text style={styles.Titulo}>Escala Barueri</Text>
            </View>


            <View style={styles.inputContainer}>

              <Text style={styles.tituloInput}> LOGIN </Text>

              <TextInput style={styles.Input}
                placeholder='Número de Matrícula'
                placeholderTextColor={'#111827'}
                keyboardType='numeric'
                value={registration}
                onChangeText={setRegistration}
              >
              </TextInput>

              <TextInput style={styles.Input}
                placeholder='Senha'
                placeholderTextColor={'#111827'}
                keyboardType='numeric'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              >
              </TextInput>

              <Pressable
                style={styles.botaoInput} onPress={handleSignIn}>
                <Text style={styles.textBotaoInput}> ENTRAR </Text>
              </Pressable>


              <Link href='email' style={styles.trocarInput}>
                <Text style={styles.textTrocarInput}> ESQUECI MINHA SENHA </Text>
              </Link>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    

  );
}
