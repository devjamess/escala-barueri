import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components/native';
import { goBack } from "expo-router/build/global-state/routing";
import { main_styles } from '../../hook/useStyleMain'
import { useAuth } from '../../hook/useAuth'

export default function Notification() {
  const route = useRouter();
  const { user } = useAuth();
  const { colors } = useTheme();

  const formater = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Garante formato 24h
  });

  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return formater.format(date);
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return '--:--';
    }
  };

  const styles = main_styles(colors)
  return (
    <ScrollView style={styles.Container}>
      <View style={styles.Navbar}>
        <Ionicons name='arrow-back' size={30} color={colors.on_nav_bar} onPress={() => route.back(goBack)} />
        <Text style={styles.NavbarText}>Notificações</Text>
        <Ionicons name='home-sharp' size={30} color={colors.on_nav_bar} onPress={() => route.push('/main')} />
      </View>

      <View style={styles.notificationContainer}>
        {user?.notificacoes.map((n, key) => (
          <View key={key} style={styles.notificationContent}>
            <Text style={{ fontFamily: 'Montserrat-Bold', color: colors.on_background }}> {n.tipo_notificacao} </Text>
            <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.text }}> Olá, {user?.funcionario?.nome}</Text>
            <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text }}>
              {n.mensagem}
            </Text>

            <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
              <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text }}>
                {formatTime(n.enviada_em)}
                </Text>
            </View>
          </View>
        ))}
      </View>

    </ScrollView>
  )
}

