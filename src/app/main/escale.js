import { Ionicons, Octicons } from "@expo/vector-icons";
import { View, Text, ScrollView } from "react-native";
import { goBack } from "expo-router/build/global-state/routing";
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components/native';
import CustomCalendar from '../../components/calendar';
import { main_styles } from '../../hook/useStyleMain'
import { useAuth } from '../../hook/useAuth'

export default function Escale() {

  const route = useRouter();

  const { user } = useAuth()
  const scale = user?.escala || null
  const team = user?.equipe.nome_equipe || null
  const region = user?.regiao.nome_regiao || null
  const turn = user?.turno || null
  const { colors } = useTheme();

  const formatFolgas = (escala) => {
  if (!escala) return 'Não definido';
  
  if (escala.tipo_escala === '12x36' || escala.tipo_escala === '24x48') {
    return `${escala.tipo_escala.split('x')[1]} horas de folga`;
  }
  
  if (escala.dias_n_trabalhados) {
    return `${escala.dias_n_trabalhados} dias`;
  }

  return 'Não definido';
};

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

        <CustomCalendar />

        <View style={styles.CalendarItems}>
          <View style={styles.Item}>
              <Text style={styles.ItemTitle}>Folgas:</Text>
              <Text style={styles.ItemContent}>{formatFolgas(scale)}</Text>
          </View>
          <View style={styles.Item}>
              <Text style={styles.ItemTitle}>Horário:</Text>
              <Text style={styles.ItemContent}> {`${turn?.inicio_turno} - ${turn?.termino_turno}`}</Text>
          </View>
          <View style={styles.Item}>
              <Text style={styles.ItemTitle}>Intervalo:</Text>
              <Text style={styles.ItemContent}>{turn?.intervalo_turno}</Text>
          </View>
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
            {scale?.tipo_escala} - Escala Semanal</Text>
        </View>

        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}>
            Horário de Trabalho: </Text>
          <Text style={styles.DetailsContentText}>
            {`Das ${turn?.inicio_turno} ás ${turn?.termino_turno}`}</Text>
        </View>

        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}>
            Dias de Folga: </Text>
          <Text style={styles.DetailsContentText}>
            {formatFolgas(scale)}</Text>
        </View>


        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}>
            Feriados: </Text>
          <Text style={styles.DetailsContentText}>
            Dias:  </Text>
        </View>

      </View>


    </ScrollView>
  )
}

