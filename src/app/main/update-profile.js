import React,{useState, useEffect} from 'react';
import { ScrollView, Text, View, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import {main_styles} from '../../hook/useStyleMain'
import { useTheme } from 'styled-components/native';
import { Ionicons, Feather, Octicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router';
import { goBack } from 'expo-router/build/global-state/routing'
import { useAuth } from '../../hook/useAuth';
export default function UpdateProfile() {

    const { colors } = useTheme();
    const styles = main_styles(colors);
    const route = useRouter()
    const {user, updateProfile} = useAuth();

    const [form, setForm] = useState({})
    const [load, setLoad] = useState(false)

    useEffect(()=>{
      if(user?.funcionario){
        setForm({
          telefone: user?.funcionario?.telefone,
           email: user?.funcionario?.email})
      }
    }, [user])
    const handleChange = (name) =>(value)=> {
      setForm(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async () =>{
      setLoad(true)
      const newInfo = await updateProfile(user, form)
      if(newInfo.result){
        Alert.alert('Sucesso! ',newInfo.sucess)
        route.replace('/main/profile')
      }else{
        Alert.alert('Erro ao atualizar perfil: ',newInfo.error)
      }
      setLoad(false)
    }

  return(
    <ScrollView style={styles.Container}>
      <View style={styles.Navbar}>
        <Ionicons name="arrow-back" size={30} color={colors.on_nav_bar} onPress={()=>route.back(goBack)} />
        <Text style={styles.NavbarText}> Atualizar Perfil</Text>
        <Octicons name="bell" color={colors.on_nav_bar} size={30} onPress={() => route.push('/main/notification')} />
      </View>

       <View style={styles.Content}>

        <View style={styles.Circle}>
          <Feather name="user" size={130} color={colors.on_background} />
        </View>


      <View style={styles.UserContainer}>
        <View> 
          <Text style={styles.UserInfo}>Matrícula:</Text>
          <Text style={styles.UserInfoAuth}>
            {user?.funcionario.matricula_funcionario}
            </Text>
        </View>
        <View>
          <Text style={styles.UserInfo}>Telefone:</Text>
          <TextInput 
          style={[styles.UserInfoAuth, {
            borderBottomWidth: 1, 
            borderColor: colors.text
          }]}
          placeholder='Telefone'
          keyboardType='phone-pad'
          placeholderTextColor={'#111827'}
          value={form.telefone}
          onChangeText={handleChange('telefone')}>

          </TextInput>
        </View>

        <View>
          <Text style={styles.UserInfo}>Email:</Text>
          <TextInput 
          style={[styles.UserInfoAuth, {
            borderBottomWidth: 1, 
            borderColor: colors.text
          }]}
          placeholder='E-mail'
          keyboardType='email-address'
          placeholderTextColor={'#111827'}
          value={form.email}
          onChangeText={handleChange('email')}>
          </TextInput>
        </View>
        <View>
          <Pressable style={styles.button_confirm} onPress={handleSubmit}>
            {load ? <ActivityIndicator color="#fff" /> : <Text style={styles.button_text}>Confirmar</Text>}
            </Pressable>
        </View>
       </View>
      </View>

    </ScrollView>
  )
}