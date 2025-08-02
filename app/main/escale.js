import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { goBack } from "expo-router/build/global-state/routing";
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components/native';
import CustomCalendar from '../../components/calendar';

//import ptBR from "../../utils/local
// eCalendarConfig";

//LocaleConfig.locales["pt-br"] = ptBR;
//LocaleConfig.defaultLocale = "pt-br";

export default function Escale() {
  
  const route = useRouter();

  const { colors } = useTheme();

  const calendarItems = [
  {
    label: 'Folgas',
    color: colors.content_yellow,
    value: '5 - 12 - 19 - 26',
  },
  {
    label: 'Feriados',
    color: colors.content_blue,
    value: '3 - 4 - 5',
  },
  {
    label: 'Trabalho',
    color: colors.content_gray,
    value: '8h - 18h',
  },
  {
    label: 'Jornada',
    color: colors.content_gray,
    value: '8 - 22',
  },
];

  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    Navbar: {
      padding: 20,
      flexDirection: 'row',
      backgroundColor: colors.nav_bar,
      justifyContent: 'flex-start',
      gap: 50,
      alignItems: 'center'
    },
    NavbarText: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 32,
      color: colors.on_nav_bar
    },
    CalendarDetails: {
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      flexDirection: 'row-reverse',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.text
    },
    CalendarDetailsTitle: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 18,
      padding: 10,
      color: colors.text
    },
    CalendarDetailsContent: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 16,
      marginHorizontal: 90,
      color: colors.text
    },
    Content_margin: {
      margin: 15
    },
    DetailsContainer: {
      flex: 1,
      margin: 20,
      borderRadius: 10,
      alignItems: 'center',
      gap: 15,
    },
    DetailsContainerTitle: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 20,
      textAlign: 'center',
      width: '100%',
      padding: 10,
      color: colors.text,
      backgroundColor: colors.contentsGray,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    },
    DetailsContent: {
      backgroundColor: colors.contentsWhite,
      justifyContent: 'center',
      borderRadius: 10,
      //borderRadius: 10,
      padding: 10,
      width: '100%',
      // iOS Shadow
      shadowColor: '#000000',
      shadowOffset: { width: 5, height: 7 },
      shadowOpacity: 0.76,
      shadowRadius: 3.84,

      // Android Shadow
      elevation: 5,
    },
    DetailsContentTitle: {
      fontFamily: 'Montserrat-Bold', 
      color: colors.text
    },
    DetailsContentText: {
      fontFamily: 'Montserrat-Medium', 
      color: colors.text
    },

  })
  return (
    <ScrollView style={styles.Container}>
      <View style={styles.Navbar}>
        <Ionicons name="arrow-back" size={30} color={colors.on_nav_bar} 
        onPress={() => route.back(goBack)} />
        <Text style={styles.NavbarText}> Minha Escala</Text>
      </View>

      <View style={styles.Content_margin}>


        <CustomCalendar 
        highlightedDates={{
            '2025-08-05': {
              container: { backgroundColor: colors.content_yellow },
              text: { color: colors.text },
            },
            '2025-08-12': {
              container: { backgroundColor: colors.content_yellow },
              text: { color: colors.text },
            },
            '2025-08-19': {
              container: { backgroundColor: colors.content_yellow },
              text: { color: colors.text },
            },
            '2025-08-26': {
              container: { backgroundColor: colors.content_yellow },
              text: { color: colors.text },
            },

            '2025-08-03': {
              container: { backgroundColor: colors.content_blue },
              text: { color: colors.on_text },
            },
            '2025-08-04': {
              container: { backgroundColor: colors.content_blue },
              text: { color: colors.on_text },
            }

        }}/>

        <View
  style={{
    marginTop: 30,
    alignItems: 'center',
    gap: 10,
  }}
>
  {calendarItems.map((item, index) => (
    <View
      key={index}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        padding: 0,
        borderRadius: 10,
        backgroundColor: colors.on_text,
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 7 },
        shadowOpacity: 0.76,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View
        style={{
          backgroundColor: item.color,
          borderRadius: 8,
        }}
      >
        <Text style={styles.CalendarDetailsTitle}>{item.label}</Text>
      </View>
      <Text style={styles.CalendarDetailsContent}>{item.value}</Text>
    </View>
  ))}
</View>
      </View>



      <View style={styles.DetailsContainer}>
        <Text style={styles.DetailsContainerTitle}> Esacala Detalhada</Text>

        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}> 
            Local: </Text>
          <Text style={styles.DetailsContentText}> 
            Secretaria de Mobilidade Urbana</Text>
        </View>


        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}> 
            Equipe: </Text>
          <Text style={styles.DetailsContentText}> 
            Alpha Norte </Text>
        </View>


        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}> 
            Escala de Trabalho: </Text>
          <Text style={styles.DetailsContentText}> 
            6 X 1 - Escala Semanal</Text>
        </View>

        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}> 
            Horário de Trabalho: </Text>
          <Text style={styles.DetailsContentText}> 
            8h ás 18h - 10 horas de trabalho</Text>
        </View>

        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}> 
            Dias de Folga: </Text>
          <Text style={styles.DetailsContentText}> 
            Quarta-Feira</Text>
        </View>


        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}> 
            Feriados: </Text>
          <Text style={styles.DetailsContentText}> 
            Dias: 3 - 4 - 5 </Text>
        </View>

        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}> 
            Jornada Suplementar: </Text>
          <Text style={styles.DetailsContentText}> 
            Dias: 8 - 22 </Text>
        </View>

      </View>


    </ScrollView>
  )
}

