import { Alert, ActivityIndicator ,View, Text,KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image, StyleSheet, ImageBackground, TextInput, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hook/useAuth';
import { useState } from 'react';
import {styles} from '../hook/useStyleApp';



export default function EmailLogin() {
  const route = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [matricula_funcionario, setId] = useState(null);
  const { verifyEmail } = useAuth();

   const handleVerifyEmail = async () => {
    setLoading(true);
    const emailData = await verifyEmail(email);
    
      if (emailData.result) {
    console.log("infos",emailData.result);
    setId(emailData.result.matricula_funcionario);
    route.push(`/code?matricula_funcionario=${matricula_funcionario}`);
    } else{
      Alert.alert('Erro na verificação', emailData.error);
    }
    setLoading(false);
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
        keyboardType='email-address'
        placeholderTextColor={'#111827'}
        value={email}
        onChangeText={setEmail}
        >
        </TextInput>

        <Pressable style={styles.botaoInput} onPress={handleVerifyEmail}
        >
        {
          loading ? (<ActivityIndicator color="#fff" />) :
          (<Text style={styles.textBotaoInput}> VERIFICAR </Text>)
        }
          
        </Pressable>

      
      </View>
    </View>
            </ScrollView>
          </KeyboardAvoidingView>
  
  );
}
