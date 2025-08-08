import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, StyleSheet, ImageBackground, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import {styles} from '../constants/layout-login';



export default function Telefone() {
  const route = useRouter();
 
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

      <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <Pressable style={styles.arrowBack}
          onPress={() => route.replace('/')}>
            <Ionicons name='arrow-back' size={24} color={'#111827'}/>
          </Pressable>
          <Text style={styles.tituloInput}> REDEFINIR SENHA </Text>
        </View>

        <TextInput style={styles.Input} 
        keyboardType='numeric'
        placeholder='Número de telefone'
        placeholderTextColor={'#111827'}>
        </TextInput>

        <TouchableOpacity style={styles.botaoInput} onPress={() => route.push('/')}//{handleResetPassword}
        >
          <Text style={styles.textBotaoInput}> VERIFICAR </Text>
        </TouchableOpacity>

        
        <Link href={'/email'} style={styles.trocarInput} >
          <Text style={styles.textTrocarInput}> CONTINUAR COM EMAIL </Text>
        </Link>
  
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  
  );
}
