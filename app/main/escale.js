import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { goBack } from "expo-router/build/global-state/routing";
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components/native';

//import ptBR from "../../utils/localeCalendarConfig";

//LocaleConfig.locales["pt-br"] = ptBR;
//LocaleConfig.defaultLocale = "pt-br";

export default function Escale() {
  
  const route = useRouter();

  const { colors } = useTheme();

  const calendarItems = [
  {
    label: 'Folgas',
    color: colors.defaultColor,
    value: '5 - 12 - 19 - 26',
  },
  {
    label: 'Feriados',
    color: colors.defaultColor,
    value: '3 - 4 - 5',
  },
  {
    label: 'Trabalho',
    color: colors.defaultColor,
    value: '8h - 18h',
  },
  {
    label: 'Jornada',
    color: colors.defaultColor,
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
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 32,
      color: colors.onBackground
    },
    CalendarDetails: {
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      flexDirection: 'row-reverse',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.gray
    },
    CalendarDetailsTitle: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 18,
      padding: 10,
      color: colors.onBackground
    },
    CalendarDetailsContent: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 16,
      marginHorizontal: 90,
      color: colors.onBackground
    },
    Content: {
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
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 17,
      paddingHorizontal: 102,
      paddingVertical: 5,
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
  })
  return (
    <ScrollView style={styles.Container}>
      <View style={styles.Navbar}>
        <Ionicons name="arrow-back" size={30} color={colors.on_nav_bar} 
        onPress={() => route.back(goBack)} />
        <Text style={styles.NavbarText}> Minha Escala</Text>
      </View>

      <View style={styles.Content}>

        <Calendar style={{ borderRadius: 20, padding: 20 }}
          headerStyle={{
            backgroundColor: colors.calendar,
            borderRadius: 20,
          }}
          theme={{
            textMonthFontFamily: 'Montserrat-SemiBold',
            textMonthFontSize: 18,
            monthTextColor: colors.defaultColor,
            arrowColor: colors.defaultColor,
            dayTextColor: colors.onBackground,
            calendarBackground: colors.calendar,
            textSectionTitleColor: colors.onBackground,
            textDayHeaderFontFamily: 'Montserrat-SemiBold',
            textDayHeaderFontSize: 14,
            textDayFontFamily: 'Montserrat-SemiBold',
            todayTextColor: colors.onBackground,
          }}
          markingType="multi-dot"
          markedDates={{
            '2025-03-03': {
              customStyles: {
                container: {
                  backgroundColor: 'yellow',
                  borderRadius: 10,
                },
                text: {
                  color: 'black',
                  fontWeight: 'bold',
                },
              },
            },
            '2025-03-04': {
              customStyles: {
                container: {
                  backgroundColor: 'yellow',
                  borderRadius: 10,
                },
                text: {
                  color: 'black',
                  fontWeight: 'bold',
                },
              },
            },
            '2025-03-05': {
              customStyles: {
                container: {
                  backgroundColor: '#194a5e',
                  borderRadius: 10,
                },
                text: {
                  color: 'white',
                },
              },
            },
          }}
        />


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
        backgroundColor: colors.contentsWhite,
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
          <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> 
            Local: </Text>
          <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> 
            Secretaria de Mobilidade Urbana</Text>
        </View>


        <View style={styles.DetailsContent}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> 
            Equipe: </Text>
          <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> 
            Alpha Norte </Text>
        </View>


        <View style={styles.DetailsContent}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> 
            Escala de Trabalho: </Text>
          <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> 
            6 X 1 - Escala Semanal</Text>
        </View>

        <View style={styles.DetailsContent}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> 
            Horário de Trabalho: </Text>
          <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> 
            8h ás 18h - 10 horas de trabalho</Text>
        </View>

        <View style={styles.DetailsContent}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> 
            Dias de Folga: </Text>
          <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> 
            Quarta-Feira</Text>
        </View>


        <View style={styles.DetailsContent}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> 
            Feriados: </Text>
          <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> 
            Dias: 3 - 4 - 5 </Text>
        </View>

        <View style={styles.DetailsContent}>
          <Text style={{ fontFamily: 'Montserrat-SemiBold', color: colors.defaultColor }}> 
            Jornada Suplementar: </Text>
          <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.onBackground }}> 
            Dias: 8 - 22 </Text>
        </View>

      </View>


    </ScrollView>
  )
}

