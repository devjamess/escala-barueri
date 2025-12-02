import { Alert, ActivityIndicator, View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image, StyleSheet, ImageBackground, TextInput, Pressable } from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hook/useAuth';
import { useState, useEffect } from 'react';
import { styles } from '../hook/useStyleApp';


export default function Code() {
  const route = useRouter();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { verifyCode } = useAuth();
  const { matricula_funcionario } = useLocalSearchParams();
  const [id, setID] = useState(null);

  useEffect(() => {
    if(!matricula_funcionario){
      setID(matricula_funcionario)     
    }
  },[matricula_funcionario]);

  const handleVerifyCode = async () => {
    setLoading(true);

    const codeData = await verifyCode(id, code)
    if (codeData.result) {
      route.push(`/forgot-password?id=${id}&code=${code}`);
    } else {
      Alert.alert('Erro na verificação', codeData.error);
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
