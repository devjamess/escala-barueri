import { View, Text, Pressable, ScrollView } from 'react-native'
import { Ionicons, Feather, Octicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { goBack } from 'expo-router/build/global-state/routing'
import { useTheme } from 'styled-components/native';
import { useAuth } from '../../hook/useAuth';
import {main_styles} from '../../hook/useStyleMain'
export default function Profile() {
  const route = useRouter();
  const { colors } = useTheme();
  const { user } = useAuth();
  const sector = user?.setor.nome_setor
  
  const styles = main_styles(colors)


  return (
    <ScrollView style={styles.Container}>
      <View style={styles.Navbar}>
        <Ionicons name='arrow-back' size={30} color={colors.on_nav_bar} onPress={() => route.back(goBack)} />
        <Text style={styles.NavbarText}> Perfil</Text>
        <Octicons name="bell" color={colors.on_nav_bar} size={30} onPress={() => route.push('/main/notification')} />
      </View>

      <View style={styles.Content}>

        <View style={styles.Circle}>
          <Feather name="user" size={130} color={colors.on_background} />
        </View>

        <View style={styles.UserContainer}>

        <View>
          <Text style={{ 
            fontFamily: 'Montserrat-Bold', 
            fontSize: 26,
            color: colors.text }}>
              {user?.funcionario.nome}
          </Text>
        </View>     

        <View>
          <Text style={styles.UserInfo}>N° de Matrícula:</Text>
          <Text style={styles.UserInfoAuth}>{user?.funcionario.matricula_funcionario}</Text>
          <Text style={styles.UserInfo}>Telefone:</Text>
          <Text style={styles.UserInfoAuth}>{user?.funcionario.telefone}</Text>
          <Text style={styles.UserInfo}>Email:</Text>
          <Text style={styles.UserInfoAuth}>{user?.funcionario.email}</Text>
          <Text style={styles.UserInfo}>Setor:</Text>
          <Text style={styles.UserInfoAuth}>{sector}</Text>
          <Text style={styles.UserInfo}>Cargo:</Text>
          <Text style={styles.UserInfoAuth}>{user?.funcionario.cargo}</Text>
       </View>

        <View>
          <Pressable style={styles.button_confirm}>
            <Text style={styles.button_text}>ATUALIZAR DADOS</Text>
          </Pressable>
          <Pressable style={styles.button_cancel} >
            <Text style={styles.button_text}>REDEFINIR SENHA</Text>
          </Pressable>
          </View>  
        </View>

      </View>
    </ScrollView>
  )
}
