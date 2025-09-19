import { ActivityIndicator, Alert, View, Platform, ScrollView, Text, Pressable, Image, ImageBackground, TextInput, KeyboardAvoidingView } from 'react-native';
import { Link, useRouter, } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { styles } from '../hook/useStyleApp';



export default function Login() {
  const route = useRouter();
  const [matricula_funcionario, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    setLoading(true);
    const userData = await signIn(matricula_funcionario, senha);
    setLoading(false);

    if (userData) {
      route.push('/main');
    } else {
      Alert.alert('Erro ao fazer login', 'Verifique suas credenciais e tente novamente.');
    }
  };

  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'

      >
        <View style={{ flex: 1 }}>

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
              value={matricula_funcionario}
              onChangeText={setMatricula}
            >
            </TextInput>

            <TextInput style={styles.Input}
              placeholder='Senha'
              placeholderTextColor={'#111827'}
              keyboardType='default'
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            >
            </TextInput>

            <Pressable
              style={styles.botaoInput} 
              onPress={handleSignIn}
              >
              {
                loading ? (<ActivityIndicator color="#fff" />) :
                  (<Text style={styles.textBotaoInput}> ENTRAR </Text>)
              }

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
