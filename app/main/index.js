import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import PopUp from '../../components/modal'
import { SimpleLineIcons, Feather, FontAwesome, Octicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import {useTheme} from 'styled-components/native';
import { goBack } from "expo-router/build/global-state/routing";
import { useAuth } from "../../hook/useAuth";
import {styles} from '../../components/layout-main'
import React, { useState } from "react";



export default function Home() {
  const route = useRouter();
 const { colors } = useTheme();
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    route.replace('/');
  }

  


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

