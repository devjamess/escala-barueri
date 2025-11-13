import { Ionicons, Octicons } from "@expo/vector-icons";
import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from 'react'
import { goBack } from "expo-router/build/global-state/routing";
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components/native';
import CustomCalendar from '../../components/calendar';
import { main_styles } from '../../hook/useStyleMain'
import { useAuth } from '../../hook/useAuth'

export default function Escale() {

  const route = useRouter();

  const { user, holidays, reminders } = useAuth()

  const [loadingHolidays, setLoadingHolidays] = useState(true);
  const [loadingReminders, setLoadingReminders] = useState(true);

  useEffect(() => {
    if (holidays) {
      setLoadingHolidays(false)
    }
    if (reminders) {
      setLoadingReminders(false)
    }
  }, [holidays, reminders])

  const scale = user?.escala || null
  const team = user?.equipe.nome_equipe || null
  const region = user?.regiao.nome_regiao || null
  const turn = user?.turno || null
  const { colors } = useTheme();

  // utilidades
  const nomesDias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

  const formatDateBR = (d) => {
    const dd = d.getDate().toString().padStart(2, '0');
    const mm = (d.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };


  const formatDiaFolgaResumH = (escala) => {
    if (!escala || !escala.tipo_escala) return { diaSemana: 'Não definido', data: null };

    const tipo = escala.tipo_escala.toLowerCase();
    const agora = new Date();

    // parâmetros do ciclo em horas
    let cicloHoras, horasTrabalho;
    if (tipo === '12x36') {
      horasTrabalho = 12; cicloHoras = 48;
    } else if (tipo === '24x48') {
      horasTrabalho = 24; cicloHoras = 72;
    } else {
      return { diaSemana: 'Não definido', data: null };
    }

    // data de referência (quando o ciclo começou). Se não existir, assume agora
    const ref = escala.data_inicio ? new Date(escala.data_inicio + 'T00:00:00') : new Date();
    const diffMs = agora - ref;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    // posição atual no ciclo (0 .. cicloHoras-1)
    const pos = ((diffHours % cicloHoras) + cicloHoras) % cicloHoras;

    // calculamos quantas horas até o INÍCIO da próxima folga (próximo período de descanso)
    let horasAteProximaFolga;
    if (pos < horasTrabalho) {
      // estamos em período de trabalho -> folga começa após (horasTrabalho - pos) horas
      horasAteProximaFolga = horasTrabalho - pos;
    } else {
      // estamos em folga -> pular folga atual + próximo período de trabalho
      horasAteProximaFolga = (cicloHoras - pos) + horasTrabalho;
    }

    // próxima folga começa daqui a `horasAteProximaFolga` horas
    const proximaFolga = new Date(agora.getTime() + horasAteProximaFolga * 60 * 60 * 1000);

    return {
      diaSemana: nomesDias[proximaFolga.getDay()],
      data: proximaFolga
    };
  };
  const formatDiaFolgaResumS = (escala) => {
    // precisa: escala.dias_trabalhados, escala.dias_n_trabalhados, e idealmente escala.data_inicio (início do ciclo)
    if (!escala) return { diaSemana: 'Não definido', data: null };

    const diasTrabalhados = Number(escala.dias_trabalhados || 0);
    const diasFolga = Number(escala.dias_n_trabalhados || 0);
    const hoje = new Date();
    const hojeMid = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()); // só data
    const diaHoje = hojeMid.getDay(); // 0..6

    // se houver dias_folga_especificos (ex: ['SEG','TER']) prioriza esse caso
    if (Array.isArray(escala.dias_folga_especificos) && escala.dias_folga_especificos.length > 0) {
      const mapa = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
      const folgas = escala.dias_folga_especificos.map(d => String(d).toUpperCase().slice(0, 3));
      // procura o próximo dia (estritamente depois de hoje). se hoje for folga, pula pra próxima ocorrência
      for (let i = 1; i <= 14; i++) {
        const dia = (diaHoje + i) % 7;
        if (folgas.includes(mapa[dia])) {
          const data = new Date(hojeMid);
          data.setDate(hojeMid.getDate() + i);
          return { diaSemana: nomesDias[data.getDay()], data };
        }
      }
      return { diaSemana: 'Não definido', data: null };
    }

    // se não tiver dias especificos, usa ciclo baseado em data_inicio + diasTrabalhados/diasFolga
    if (!escala.data_inicio || diasTrabalhados <= 0 || diasFolga <= 0) {
      // fallback: assume trabalha diasTrabalhados começando hoje
      const fallback = new Date(hojeMid);
      fallback.setDate(hojeMid.getDate() + (diasTrabalhados || 1));
      return { diaSemana: nomesDias[fallback.getDay()], data: fallback };
    }

    const inicio = new Date(escala.data_inicio + 'T00:00:00');
    const inicioMid = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate());
    const diffDays = Math.floor((hojeMid - inicioMid) / (1000 * 60 * 60 * 24));
    // ciclo completo em dias
    const ciclo = diasTrabalhados + diasFolga;
    // posição atual no ciclo (pode ser negativo se inicio no futuro)
    const pos = ((diffDays % ciclo) + ciclo) % ciclo; // 0 .. ciclo-1

    let diasAteProximaFolga;
    if (pos < diasTrabalhados) {
      // estamos trabalhando -> próxima folga começa em (diasTrabalhados - pos) dias
      diasAteProximaFolga = diasTrabalhados - pos;
    } else {
      // estamos em folga -> pular folga atual e próximo período de trabalho
      diasAteProximaFolga = (ciclo - pos) + diasTrabalhados;
    }

    const proximaFolga = new Date(hojeMid);
    proximaFolga.setDate(hojeMid.getDate() + diasAteProximaFolga);

    return { diaSemana: nomesDias[proximaFolga.getDay()], data: proximaFolga };
  };
  const formatDiaFolgaResum = (escala) => {
  if (!escala) return { diaSemana: 'Não definido', data: null };

  const tipo = String(escala.tipo_escala || '').toLowerCase().trim();

  // trata especificamente 12x36 e 24x48 como "horário"
  if (tipo === '12x36' || tipo === '24x48') {
    return formatDiaFolgaResumH(escala);
  }

  // por segurança: se for um "NxM" mas o primeiro número >= 12 -> pode ser horário,
  // mas como você pediu, vamos considerar apenas 12x36 e 24x48 como horários.
  // todo o resto cai como semanal:
  return formatDiaFolgaResumS(escala);
  };





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
      return ["1 folga após 1 expediente"];

    } else if (escala.tipo_escala === '24x48') {
      return ["2 folgas após 1 expediente"];

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
  }; const formatDiasFolga = (escala) => {
    const diasFolga = DiasFolga(escala);

    if (diasFolga.length === 0) {
      return 'Não definido';
    }

    return diasFolga.join(' - ');
  };

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

  const formatReminders = () => {
    if (loadingReminders) return 'Carregando...';

    if (!reminders || reminders.length === 0) {
      return 'Nenhum lembrete cadastrado';
    }

    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();

    const reminderlist = reminders?.filter(editday =>
      editday.matricula_funcionario === user?.funcionario?.matricula_funcionario
    );

    const lembretesMesAtual = reminderlist.filter(lembrete => {
      const dataLembrete = new Date(lembrete.data_diae + 'T00:00:00');
      return dataLembrete.getMonth() === mesAtual && dataLembrete.getFullYear() === anoAtual;
    });

    if (lembretesMesAtual.length === 0) {
      return 'Nenhum lembrete este mês';
    }

    return lembretesMesAtual.map(lembrete => {
      const data = new Date(lembrete.data_diae + 'T00:00:00');
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      const titulo = lembrete.nome_diae
      const descricao = lembrete.descricao_diae
      return `${dia}/${mes} - ${titulo} \n ${descricao}`;
    }).join('\n\n');
  };

  const formatRemindersResum = () => {
    if (loadingReminders) return 'Carregando...';

    if (!reminders || reminders.length === 0) {
      return 'Nenhum lembrete';
    }

    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();

    const reminderlist = reminders?.filter(editday =>
      editday.matricula_funcionario === user?.funcionario?.matricula_funcionario
    );

    const lembretesMesAtual = reminderlist.filter(lembrete => {
      const dataLembrete = new Date(lembrete.data_diae + 'T00:00:00');
      return dataLembrete.getMonth() === mesAtual && dataLembrete.getFullYear() === anoAtual;
    });

    if (lembretesMesAtual.length === 0) {
      return 'Nenhum este mês';
    }

    return lembretesMesAtual.map(lembrete => {
      const data = new Date(lembrete.data_diae + 'T00:00:00');
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      const titulo = lembrete.nome_diae
      return `${dia}/${mes} - ${titulo}`;
    }).join(' \n');
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

        <CustomCalendar feriados={holidays} reminders={reminders} matricula={user.funcionario.matricula_funcionario} />

        <View style={styles.CalendarItems}>
          <View style={styles.Item}>
            <Text style={[styles.ItemTitle, { backgroundColor: colors.button_cancel }]}>Folgas:</Text>
            <Text style={styles.ItemContent}>{formatDiasFolga(scale)}</Text>
          </View>

          <View style={styles.Item}>
            <Text style={[styles.ItemTitle, { backgroundColor: colors.button_confirm }]}>Trabalho:</Text>
            <Text style={styles.ItemContent}> {`${formatTurn(turn?.inicio_turno)} - ${formatTurn(turn?.termino_turno)}`}</Text>
          </View>

          <View style={styles.Item}>
            <Text style={[styles.ItemTitle, { backgroundColor: '#265ed8ff' }]}>Feriados:</Text>
            <Text style={styles.ItemContent}>{formatHolidaysResum()}</Text>
          </View>

          <View style={styles.Item}>
            <Text style={[styles.ItemTitle, { backgroundColor: '#FFA500', fontSize: 15.5 }]}>Mudanças:</Text>
            <Text style={styles.ItemContent}>{formatRemindersResum()}</Text>
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
            {`Das ${formatTurn(turn?.inicio_turno)} às ${formatTurn(turn?.termino_turno)} | Intervalo às ${formatTurn(turn?.intervalo_turno)}`}</Text>
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

        <View style={styles.DetailsContent}>
          <Text style={styles.DetailsContentTitle}>
            Mudanças Esporádicas: </Text>
          <Text style={styles.DetailsContentText}>
            {"\n" + formatReminders()}</Text>
        </View>

      </View>


    </ScrollView>
  )
}