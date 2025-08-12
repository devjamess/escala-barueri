import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { goBack } from 'expo-router/build/global-state/routing'
import { useTheme } from 'styled-components/native';
import { useAuth } from '../../hook/useAuth';
import {styles} from '../../components/layout-main'
export default function Profile() {
  const route = useRouter();
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <View style={styles.Container}>
      <View style={styles.Navbar}>
        <Ionicons name='arrow-back' size={30} color={colors.on_nav_bar} onPress={() => route.back(goBack)} />
        <Text style={styles.NavbarText}> Perfil</Text>
      </View>

      <View style={styles.Content}>

        <View style={styles.Circle}>
          <Feather name="user" size={130} color={colors.on_background} />
        </View>

        <View style={styles.UserContainer}>
          <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 22, marginBottom: 15,color: colors.text}}>{user?.nome}</Text>
          <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20, color: colors.on_background}}>N° de Matrícula:</Text>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18, color: colors.text}}>{user?.matricula}</Text>
          <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20, color: colors.on_background}}>Telefone:</Text>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18, color: colors.text}}>11 94987 - 5366</Text>
          <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20, color: colors.on_background}}>Email:</Text>
          <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18, marginBottom: 25, color: colors.text}}>{user?.email}</Text>

          <Pressable style={{ backgroundColor: colors.button_confirm, padding: 7, borderRadius: 10, marginBottom: 15}}>
            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 18, color:colors.text}}>ATUALIZAR DADOS</Text>
          </Pressable>
          <Pressable style={{backgroundColor: colors.button_cancel, padding: 7, borderRadius: 10}} >
            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 18, color:colors.text}}>REDEFINIR SENHA</Text>
          </Pressable>
        </View>

      </View>
    </View>
  )
}
