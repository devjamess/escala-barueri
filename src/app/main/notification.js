import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import {useTheme} from 'styled-components/native';
import { goBack } from "expo-router/build/global-state/routing";
import {main_styles} from '../../hook/useStyleMain'

export default function Notification() {
  const route = useRouter();
const { colors } = useTheme();
const styles = main_styles(colors)
  return (
    <ScrollView style={styles.Container}>
      <View style={styles.Navbar}>
        <Ionicons name='arrow-back' size={30} color={colors.on_nav_bar} onPress={() => route.back(goBack)} />
        <Text style={styles.NavbarText}>Notificações</Text>
        <Ionicons name='home-sharp' size={30} color={colors.on_nav_bar} onPress={()=> route.push('/main')}/>
      </View>

    <View style={styles.FilterContainer}>
      <Text style={styles.FilterText}>
        Filtros
      </Text>
      <AntDesign name="down" size={24} color={colors.text} />
    </View>

    <View style={styles.notificationContainer}>
      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-Bold', color: colors.on_background }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.text }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-Bold', color: colors.on_background }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.text }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.text}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-Bold', color: colors.text, color: colors.on_background }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.text }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.text}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-Bold', color: colors.on_background }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.text }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.text}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-Bold', color: colors.on_background }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.text }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.text}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-Bold', color: colors.on_background }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.text }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.text}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-Bold', color: colors.on_background }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.text }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.text}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-Bold', color: colors.on_background }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.text }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.text}}>25/04/2025</Text>
        </View>
      </View>

      <View style={styles.notificationContent}>
        <Text style={{ fontFamily: 'Montserrat-Bold', color: colors.on_background }}> Atualização </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.text }}> Olá, Rogério da Silva Oliveira</Text>
        <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text }}>
          sua escala foi atualizada, verifique se necessário,
          para que não haja problema com horários ou dias trabalhados.
        </Text>

        <View style={{ justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{ fontFamily: 'Montserrat-regular', color: colors.text}}>25/04/2025</Text>
        </View>
      </View>


    </View>

    </ScrollView>
  )
}

