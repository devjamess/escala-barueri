import { Alert, ActivityIndicator, View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image, StyleSheet, ImageBackground, TextInput, Pressable } from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hook/useAuth';
import { useState } from 'react';
import { styles } from '../hook/useStyleApp';

export default function ForgotPassword() {
  const route = useRouter();
  const { updatePasswordByEmail } = useAuth();
  const { matricula, codigo} = useLocalSearchParams()
  const [load, setLoad] = useState(false);
  const [nova_senha, setSenha] = useState('');
  const [confirmar_senha, setConfirmar] = useState('');
  
      const handleForgotPassword = async () =>{
        setLoad(true)
       
        const newPassword = await updatePasswordByEmail(codigo, matricula, nova_senha, confirmar_senha)
        if(newPassword.result){
          Alert.alert('Sucesso! ', 'Sua senha foi alterada!')
          route.replace('/')
        }else{
          Alert.alert('Erro ao redefinir senha: ',newPassword.error)
        }
        setLoad(false)
      }

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
          <ImageBackground source={require('../assets/images/background-login.png')} style={styles.fundoContainer} />

          <View style={styles.logoImage}>
            <Image source={require('../assets/images/semurb-logo-login.png')} />
            <Text style={styles.Titulo}>Escala Barueri</Text>

          </View>

          <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', alignContent: 'center' }}>

              <Pressable style={styles.arrowBack} onPress={() => route.replace('/')}>
                <Ionicons name='arrow-back' size={24} color={'#111827'} />
              </Pressable>

              <Text style={styles.tituloInput}> VERIFICAR CÓDIGO </Text>
            </View>

            <TextInput style={styles.Input}
              placeholder='Nova Senha'
              secureTextEntry
              placeholderTextColor={'#111827'}
              value={nova_senha}
              onChangeText={setSenha}
            >
            </TextInput>

            <TextInput style={styles.Input}
              placeholder='Confirmar Senha'
              secureTextEntry
              placeholderTextColor={'#111827'}
              value={confirmar_senha}
              onChangeText={setConfirmar}
            >
            </TextInput>
            
            <Pressable style={styles.botaoInput} onPress={handleForgotPassword}
            >
              {
                load ? (<ActivityIndicator color="#fff" />) :
                  (<Text style={styles.textBotaoInput}> CONCLUIR </Text>)
              }
            </Pressable>


          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  );
}
