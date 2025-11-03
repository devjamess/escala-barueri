import { Alert, ActivityIndicator, View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image, StyleSheet, ImageBackground, TextInput, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hook/useAuth';
import { useState } from 'react';
import { styles } from '../hook/useStyleApp';

export default function Code() {
  const route = useRouter();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { verifyCode } = useAuth();

  const handleVerifyCode = async () => {
    setLoading(true);
    if (!code) {
      Alert.alert('Erro na verificação', 'Por favor, insira o código enviado ao seu email.');
    } else {
      route.push('/forgot-password');
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
              placeholder='Digite o código'
              keyboardType='numeric'
              placeholderTextColor={'#111827'}
              value={code}
              onChangeText={setCode}
            >
            </TextInput>
            
            <Pressable style={styles.botaoInput} onPress={handleVerifyCode}
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
