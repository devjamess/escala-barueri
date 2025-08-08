import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import PopUp from '../../components/modal'
import { SimpleLineIcons, Feather, FontAwesome, Octicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import {useTheme} from 'styled-components/native';
import { goBack } from "expo-router/build/global-state/routing";
import { useAuth } from "../../hook/useAuth";

import React, { useState } from "react";



export default function Home() {
  const route = useRouter();
 const { colors } = useTheme();
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    route.replace('/');
  }

  
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.background
  },
  Navbar: {  
    padding: 30,
    flexDirection: 'row',
    backgroundColor: colors.nav_bar,
    justifyContent: 'space-between',

  },
  User: {
    margin: 20,
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
    color: colors.on_background
  },

  buttonContainer: {
    flexDirection: 'row',
    margin: 20,
    gap: 20,
  },
  buttonCalendar: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    borderRadius: 15,
    backgroundColor: colors.button_main,
    aspectRatio: 1,
    elevation: 10,
  },
  buttonsRight: {
    flex: 1,
    justifyContent: 'space-around',
    gap: 15
  },
  buttonProfile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    borderRadius: 15,
    backgroundColor: colors.button_main,
    elevation: 10,

  },
  buttonConfig: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    borderRadius: 15,
    backgroundColor: colors.button_main,
    elevation: 10,
  },
  buttonText:{
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    fontSize: 17,
  },
  notificationContainer: {
    gap: 10,
    margin: 20,
    borderRadius: 10,
    
    alignItems: 'center',
    justifyContent: 'center',


  },
  notificationContainerTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    backgroundColor: colors.content_light,
    width: '100%',
    textAlign: 'center',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    color: colors.text
    
  },
  notificationContent: {
    margin: 0,
    flex: 1,
    backgroundColor: colors.content_white,
    gap: 10,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    // iOS Shadow
    shadowColor: '#000000FF',
    shadowOffset: { width: 5, height: 7 },
    shadowOpacity: 0.76,
    shadowRadius: 3.84,

    // Android Shadow
    elevation: 10,
  },


})
  return (
    <ScrollView style={styles.Container}>

      <PopUp />

      <View style={styles.Navbar}>
        <SimpleLineIcons name="logout" color={colors.on_nav_bar} size={30} onPress={handleLogout} />
        <Octicons name="bell" color={colors.on_nav_bar} size={30} onPress={() => route.push('/main/notification')} />
      </View>

      <Text style={styles.User}>Olá, {user?.nome}!</Text>

      <View style={styles.buttonContainer}>

        <Pressable style={styles.buttonCalendar} onPress={() => route.push('/main/escale')}>
          <Feather name='calendar' color={colors.icons_main} size={100} />
          <Text style={styles.buttonText}> Minha Escala </Text>
        </Pressable>

        <View style={styles.buttonsRight}>

          <Pressable style={styles.buttonProfile} onPress={() => route.push('/main/profile')}>
            <Feather name='user' color={colors.icons_main} size={40} />
            <Text style={styles.buttonText}> Perfil </Text>
          </Pressable>

          <Pressable style={styles.buttonConfig} onPress={() => route.push('/main/config')}>
            <FontAwesome name='gear' color={colors.icons_main} size={35} />
            <Text style={styles.buttonText}> Config </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.notificationContainer}>
        <Text style={styles.notificationContainerTitle}> Notificações Recentes </Text>

        <View style={styles.notificationContent}>
          <Text style={{ fontFamily: 'Montserrat-Bold', color: colors.on_background }}> Atualização </Text>
          <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.text }}> Olá,{user?.nome}</Text>
          <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text }}>
            sua escala foi atualizada, verifique se necessário,
            para que não haja problema com horários ou dias trabalhados.
          </Text>

          <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
            <Text style={{ fontFamily: 'Montserrat-regular', color: colors.text }}>25/04/2025</Text>
          </View>
        </View>

        <View style={styles.notificationContent}>
          <Text style={{ fontFamily: 'Montserrat-Bold', color: colors.on_background }}> Atualização </Text>
          <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.text }}> Olá, {user?.nome}</Text>
          <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text }}>
            sua escala foi atualizada, verifique se necessário,
            para que não haja problema com horários ou dias trabalhados.
          </Text>

          <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
            <Text style={{ fontFamily: 'Montserrat-regular', color: colors.text }}>25/04/2025</Text>
          </View>
        </View>
      </View>


     

    </ScrollView>
  )
}

