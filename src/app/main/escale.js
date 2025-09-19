import { Ionicons, Octicons } from "@expo/vector-icons";
import { View, Text, ScrollView } from "react-native";
import { goBack } from "expo-router/build/global-state/routing";
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components/native';
import CustomCalendar from '../../components/calendar';
import {main_styles} from '../../hook/useStyleMain'
import {useAuth} from '../../hook/useAuth'

export default function Escale() {
  
  const route = useRouter();

  const {user} = useAuth()
  const scale = user?.escala.tipo_escala
  const team = user?.equipe.nome_equipe || 'Desconhecido'
  const region = user?.regiao.nome_regiao || 'Desconhecido'
  const horarios = () => {
    const horario = scale

    if(!horario) return "Horario não definido"
    
    switch(horario){
      case "12x24":
      return "8h ás 20h - 12 horas de trabalho";
      case "5x2":
      return "6h ás 14h - 8 horas de trabalho";
      case "6x1":
      return "9h ás 15h - 6 horas de trabalho";
    }
  }


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
    color: colors.content_grayLight,
    value: horarios(),
  },
  {
    label: 'Jornada',
    color: colors.content_grayLight,
    value: '8 - 22',
  },
];
  const styles = main_styles(colors)
  return (
    <ScrollView style={styles.Container}>
      <View style={styles.Navbar}>
        <Ionicons name="arrow-back" size={30} color={colors.on_nav_bar} 
        onPress={() => route.back(goBack)} />
        <Text style={styles.NavbarText}> Minha Escala</Text>
        <Octicons name="bell" color={colors.on_nav_bar} size={30} onPress={() => route.push('/main/notification')} />
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

        <View style={{marginTop: 30,alignItems: 'center',gap: 10}}
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
        backgroundColor: colors.content_details,
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
            {team} </Text>
        </View>

         <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}> 
            Região: </Text>
          <Text style={styles.DetailsContentText}> 
            {region} </Text>
        </View>


        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}> 
            Escala de Trabalho: </Text>
          <Text style={styles.DetailsContentText}> 
            {scale} - Escala Semanal</Text>
        </View>

        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}> 
            Horário de Trabalho: </Text>
          <Text style={styles.DetailsContentText}> 
            {horarios()}</Text>
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

