import { Ionicons, Octicons } from "@expo/vector-icons";
import { View, Text, ScrollView } from "react-native";
import {useState, useEffect} from 'react'
import { goBack } from "expo-router/build/global-state/routing";
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components/native';
import CustomCalendar from '../../components/calendar';
import { main_styles } from '../../hook/useStyleMain'
import { useAuth } from '../../hook/useAuth'

export default function Escale() {

  const route = useRouter();
  
  const { user, holidays } = useAuth()
    useEffect(()=>{
      if(holidays){
        setLoadingHolidays(false)
      }
    },[holidays])
  const scale = user?.escala || null
  const team = user?.equipe.nome_equipe || null
  const region = user?.regiao.nome_regiao || null
  const turn = user?.turno || null
  const { colors } = useTheme();

  const formatTurn = (hora) => {
    if (!hora) return '';
    return hora.substring(0, 5);
  };


  const DiasFolga = (escala) => {
    if (!escala || !escala.data_inicio) return [];

    const diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const dataInicio = new Date(escala.data_inicio + 'T00:00:00');
    const diaInicio = dataInicio.getDay();

    let diasFolga = [];

    if (escala.tipo_escala === '12x36') {
      for (let i = 0; i < 7; i++) {
        const diaAtual = (diaInicio + i) % 7;

        if (i % 2 === 1) {
          diasFolga.push(diasSemana[diaAtual]);
        }
      }
    } else if (escala.tipo_escala === '24x48') {
      for (let i = 0; i < 7; i++) {
        const diaAtual = (diaInicio + i) % 7;
        const ciclo = i % 3;

        if (ciclo === 1 || ciclo === 2) {
          diasFolga.push(diasSemana[diaAtual]);
        }
      }
    } else if (escala.dias_n_trabalhados) {
      const diasTrabalhados = escala.dias_trabalhados || 5;
      const diasNaoTrabalhados = escala.dias_n_trabalhados;
      
      for (let i = 0; i < 7; i++) {
        const diaAtual = (diaInicio + i) % 7;
        const ciclo = i % (diasTrabalhados + diasNaoTrabalhados);
        
        if (ciclo >= diasTrabalhados) {
          diasFolga.push(diasSemana[diaAtual]);
        }
      }
    }

    return [...new Set(diasFolga)];
  };

  const formatDiasFolga = (escala) => {
    const diasFolga = DiasFolga(escala);
    
    if (diasFolga.length === 0) {
      return 'Não definido';
    }

    return diasFolga.join(' - ');
  };


  const formatFolgas = (escala) => {
    if (!escala) return 'Não definido';
    
    if (escala.tipo_escala === '12x36') {
      return '36 horas de folga';
    }
    
    if (escala.tipo_escala === '24x48') {
      return '48 horas de folga';
    }
    
    if (escala.dias_n_trabalhados) {
      return `${escala.dias_n_trabalhados} dias`;
    }

    return 'Não definido';
  };

   const [loadingHolidays, setLoadingHolidays] = useState(true);
  // Formata os feriados para exibição (apenas do mês atual)
  const formatHolidays = () => {
    if (loadingHolidays) return 'Carregando...';
    
    if (!holidays || holidays.length === 0) {
      return 'Nenhum feriado cadastrado';
    }

    const mesAtual = new Date().getMonth(); // 0-11
    const anoAtual = new Date().getFullYear();

    // Filtra feriados do mês atual
    const feriadosMesAtual = holidays.filter(feriado => {
      const dataFeriado = new Date(feriado.dia_feriado + 'T00:00:00');
      return dataFeriado.getMonth() === mesAtual;
    });

    if (feriadosMesAtual.length === 0) {
      return 'Nenhum feriado este mês';
    }

    // Formata as datas dos feriados (apenas DD/MM)
    return feriadosMesAtual.map(feriado => {
      const data = new Date(feriado.dia_feriado + 'T00:00:00');
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      return `${dia}/${mes} - ${feriado.nome_feriado}`;
    }).join('\n');
  };
  const formatHolidaysResum = () => {
    if (loadingHolidays) return 'Carregando...';
    
    if (!holidays || holidays.length === 0) {
      return 'Nenhum feriado cadastrado';
    }

    const mesAtual = new Date().getMonth(); // 0-11
    const anoAtual = new Date().getFullYear();

    // Filtra feriados do mês atual
    const feriadosMesAtual = holidays.filter(feriado => {
      const dataFeriado = new Date(feriado.dia_feriado + 'T00:00:00');
      return dataFeriado.getMonth() === mesAtual;
    });

    if (feriadosMesAtual.length === 0) {
      return 'Nenhum feriado este mês';
    }

    // Formata as datas dos feriados (apenas DD/MM)
    return feriadosMesAtual.map(feriado => {
      const data = new Date(feriado.dia_feriado + 'T00:00:00');
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      return `${dia}/${mes}`;
    }).join(' - ');
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

        <CustomCalendar feriados={holidays}/>

        <View style={styles.CalendarItems}>
          <View style={styles.Item}>
              <Text style={[styles.ItemTitle, {backgroundColor: colors.button_cancel}]}>Folgas:</Text>
              <Text style={styles.ItemContent}>{formatFolgas(scale)}</Text>
          </View>
          <View style={styles.Item}>
              <Text style={styles.ItemTitle}>Horário:</Text>
              <Text style={styles.ItemContent}> {`${formatTurn(turn?.inicio_turno)} - ${formatTurn(turn?.termino_turno)}`}</Text>
          </View>
          <View style={styles.Item}>
              <Text style={styles.ItemTitle}>Intervalo:</Text>
              <Text style={styles.ItemContent}>{formatTurn(turn?.intervalo_turno)}</Text>
          </View>
          <View style={styles.Item}>
              <Text style={[styles.ItemTitle, {backgroundColor: '#265ed8ff'}]}>Feriados:</Text>
              <Text style={styles.ItemContent}>{formatHolidaysResum()}</Text>
          </View>
        </View>

      </View>



      <View style={styles.DetailsContainer}>
        <Text style={styles.DetailsContainerTitle}> Escala Detalhada</Text>

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
            {`Das ${formatTurn(turn?.inicio_turno)} às ${formatTurn(turn?.termino_turno)}`}</Text>
        </View>

        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}>
            Dias de Folga: </Text>
          <Text style={styles.DetailsContentText}>
            {formatDiasFolga(scale)}</Text>
        </View>


        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}>
            Feriados: </Text>
          <Text style={styles.DetailsContentText}>
            {formatHolidays()}</Text>
        </View>

      </View>


    </ScrollView>
  )
}