import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import {useTheme} from 'styled-components/native';
import { goBack } from "expo-router/build/global-state/routing";


export default function Notification() {
  const route = useRouter();
const { colors } = useTheme();
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.background
  },
  Navbar: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: colors.nav_bar,
    justifyContent: 'flex-start',
    gap: 50,
    alignItems: 'center',
    marginBottom: 10
  },
  NavbarText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 32,
    color: colors.onBackground
  },

  FilterContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: colors.contentsGray,
    padding: 10
  },
  FilterText:{
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    marginHorizontal: 5,
  },

  notificationContainer: {
    flex: 1,
    gap: 10,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.background
   
  },
  notificationContent: {
    margin: 0,
    flex: 1,
    backgroundColor: colors.contentsWhite,
    gap: 10,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,

     // iOS Shadow
     shadowColor: '#000000',
     shadowOffset: { width: 5, height: 7 },
     shadowOpacity: 0.76,
     shadowRadius: 3.84,
 
     // Android Shadow
     elevation: 10,
  },
  detalhes:{
    backgroundColor: colors.transparent,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.onBackground,
    color: colors.onBackground,
    gap: 5,
    margin: 30,
  }
})
  return (
    <ScrollView style={styles.Container}>
      <View style={styles.Navbar}>
        <Ionicons name='arrow-back' size={30} color={colors.on_nav_bar} onPress={() => route.back(goBack)} />
        <Text style={styles.NavbarText}>Notificações</Text>
      </View>

    <View style={styles.FilterContainer}>
      <Text style={styles.FilterText}>
        Filtros
      </Text>
      <AntDesign name="down" size={24} color="black" />
    </View>

    <View style={styles.notificationContainer}>
      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.onBackground }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.onBackground}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.onBackground }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.onBackground}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.onBackground, color: colors.defaultColor }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.onBackground }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.onBackground}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.onBackground }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.onBackground}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.onBackground }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.onBackground}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.onBackground }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.onBackground}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.onBackground }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.onBackground}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.onBackground }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.onBackground}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.onBackground }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.onBackground}}>25/04/2025</Text>
        </View>
      </View>


    </View>

    </ScrollView>
  )
}

