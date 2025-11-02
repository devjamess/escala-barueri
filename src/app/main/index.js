import { View, Text, Pressable, ScrollView } from "react-native";
import PopUp from '../../components/modal'
import { SimpleLineIcons, Feather, FontAwesome, Octicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components/native';
import { useAuth } from "../../hook/useAuth";
import { main_styles } from '../../hook/useStyleMain'

export default function Home() {
  const route = useRouter();
  const { colors } = useTheme();
  const styles = main_styles(colors);
  const { user, signOut } = useAuth();
  const notification = user?.notificacoes
  
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

  return (
    <ScrollView style={styles.Container}>
      <PopUp />


      <View style={styles.Navbar_index}>
        <SimpleLineIcons name="logout" color={colors.on_nav_bar} size={30} onPress={()=> signOut()} />
        <Octicons name="bell" color={colors.on_nav_bar} size={30} onPress={() => route.push('/main/notification')} />
      </View>

      <Text style={styles.User}>Olá, {user?.funcionario?.nome}!</Text>

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

      <View style={styles.notificationContainer_index}>
        <Text style={styles.notificationContainerTitle}> Notificações Recentes </Text>
        {notification?.slice(0,2)?.map((n) => (
          <View key={n.id_notificacao} style={styles.notificationContent_index}>
            <Text style={{ fontFamily: 'Montserrat-Bold', color: colors.on_background }}> {n?.tipo_notificacao} </Text>
            <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.text }}> Olá, {user?.funcionario?.nome}</Text>
            <Text style={{ fontFamily: 'Montserrat-Regular', color: colors.text }}>
              {n?.mensagem}
            </Text>

            <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
              <Text style={{ fontFamily: 'Montserrat-regular', color: colors.text }}>{formatTime(n?.enviada_em)}</Text>
            </View>
          </View>
        ))}
      </View>




    </ScrollView>
  )
}

