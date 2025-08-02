import { View, Text,KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image, StyleSheet, ImageBackground, TextInput, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hook/useAuth';
import { useState } from 'react';
import {styles} from '../constants/layout-login';



export default function Email() {
  const route = useRouter();
  /*const { resetPassword, verifyEmail, user } = useAuth();
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    const emailExiste = await verifyEmail(email);
    if (!emailExiste) {
      Alert.alert('Erro', 'E-mail não encontrado. Por favor, verifique o e-mail e tente novamente.');
      return;
    }

    try {
    const reset = await resetPassword(email);
    try{
    if (reset) {
      Alert.alert('Sucesso', 'Instruções para redefinir a senha foram enviadas para o seu e-mail.');
    } else {
      Alert.alert('Erro', 'Verifique o e-mail e tente novamente.');
    }
  } catch (error) {
    Alert.alert('Erro', 'Ocorreu um erro ao tentar redefinir a senha:', error.message);
  }
} catch (error) {
    Alert.alert('Erro', 'Ocorreu um erro ao tentar redefinir a senha:', error.message);
  }
};*/
  return (

   /*<View style={styles.Container}>
      <ImageBackground source={require('../assets/images/background.png')} style={styles.fundoContainer} />

      <View style={styles.logoImage}>
        <Image source={require('../assets/images/logo.png')} />
        <Text style={styles.Titulo}>Escala</Text>
        <Text style={styles.Titulo}>Barueri</Text> 
      </View>
    

      <View style={styles.inputContainer}>

        <View style={{flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', alignContent: 'center'}}>

          <Pressable style={styles.arrowBack} onPress={() => route.replace('/')}>
              <Ionicons name='arrow-back' size={24} color={'#111827'}/>
          </Pressable>

          <Text style={styles.tituloInput}> REDEFINIR SENHA </Text>
        </View>
        

        <TextInput style={styles.Input} 
        placeholder='E-mail'
        placeholderTextColor={'#111827'}
        //value={email}
        //onChangeText={setEmail}
        >
        </TextInput>

        <TouchableOpacity style={styles.botaoInput} onPress={() => route.push('/')}//{handleResetPassword}
        >
          <Text style={styles.textBotaoInput}> VERIFICAR </Text>
        </TouchableOpacity>

        <Link href='/telefone' style={styles.trocarInput} >
            <Text style={styles.textTrocarInput}> CONTINUAR COM TELEFONE </Text>
        </Link>
      
      </View>
    </View>*/
     <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVErticalOffset={Platform.OS === 'ios' ? 60 : 0}
          >
            <ScrollView style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps='handled'
    
            >
              <View style={{flex: 1}}>
      <ImageBackground source={require('../assets/images/background-login.png')} style={styles.fundoContainer} />

      <View style={styles.logoImage}>
        <Image source={require('../assets/images/semurb-logo-login.png')} />
        <Text style={styles.Titulo}>Escala Barueri</Text>

      </View>
    

      <View style={styles.inputContainer}>

        <View style={{flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', alignContent: 'center'}}>

          <Pressable style={styles.arrowBack} onPress={() => route.replace('/')}>
              <Ionicons name='arrow-back' size={24} color={'#111827'}/>
          </Pressable>

          <Text style={styles.tituloInput}> REDEFINIR SENHA </Text>
        </View>
        

        <TextInput style={styles.Input} 
        placeholder='E-mail'
        placeholderTextColor={'#111827'}
        //value={email}
        //onChangeText={setEmail}
        >
        </TextInput>

        <TouchableOpacity style={styles.botaoInput} onPress={() => route.push('/')}//{handleResetPassword}
        >
          <Text style={styles.textBotaoInput}> VERIFICAR </Text>
        </TouchableOpacity>

        <Link href='/telefone' style={styles.trocarInput} >
            <Text style={styles.textTrocarInput}> CONTINUAR COM TELEFONE </Text>
        </Link>
      
      </View>
    </View>
            </ScrollView>
          </KeyboardAvoidingView>
  
  );
}
