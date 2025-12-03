import React, { useEffect, useState, useRef } from 'react'
import { Alert, View, Text, Pressable, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { Ionicons, Feather, Octicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { goBack } from 'expo-router/build/global-state/routing'
import { useTheme } from 'styled-components/native';
import { useAuth } from '../../hook/useAuth';
import {main_styles} from '../../hook/useStyleMain'
import {CameraView, useCameraPermissions} from 'expo-camera'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
  const route = useRouter();
  const { colors } = useTheme();
  const { user, uploadProfileImage, getProfileImage, changeProfileImage } = useAuth();
  const styles = main_styles(colors)
  const [type, setType] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const camRef = useRef(null);
  const [uri, setUri] = useState(null);
  const [camera, setCamera] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagemExistente, setImagemExistente] = useState(null);

  useEffect(() => {
    handleGetImage()
  }, []);


  async function handleOpenCamera() {
  if (!permission?.granted) {
    const { granted } = await requestPermission();
    if (!granted) {
      Alert.alert('Permissão negada', 'É necessário permitir o uso da câmera para tirar fotos de perfil.');
      return;
    }
  }
  setCamera(true);
}

  async function take(){
    if(camRef){
      const data = await camRef.current.takePictureAsync();
      setUri(data.uri)
      handleImage(data.uri)
      setCamera(false)
    }
  }
  const [infos, setInfos] = useState({})
  useEffect(()=>{
    if(user?.funcionario && user?.setor){
      setInfos({
        name: user?.funcionario?.nome,
        registration: user?.funcionario?.matricula_funcionario,
        telefone: user?.funcionario?.telefone,
        sector: user?.setor?.nome_setor,
        email: user?.funcionario?.email,
        position: user?.funcionario?.cargo,
      })
    }
  },[user])

  async function handleGetImage() {
    const matricula = user.funcionario.matricula_funcionario;
    const { result, error } = await getProfileImage(matricula);
    
    if (result) {
      setImagemExistente(result);
    } else if (error) {
      console.log('Nenhuma imagem de perfil encontrada');
    }
  }

  async function handleImage(uri) {
     const matricula = user?.funcionario?.matricula_funcionario;
    setUploading(true);

    if (!uri || !imagemExistente) {
    const uploadImage = await uploadProfileImage(matricula, uri);
      if (uploadImage.result) {
        Alert.alert('Sucesso', 'Imagem de perfil atualizada!');
        setImagemExistente(uri);
        setUri(null);
        await handleGetImage(); // Recarregar a imagem do servidor
      } else {
        Alert.alert('Erro ao enviar imagem', uploadImage.error = 'Network Error' ? 'Erro de conexão. Verifique sua internet e tente novamente.' : uploadImage.error || 'Desculpe. Ocorreu um erro no servidor.');
      }
   
      setUploading(false);
  } else{
      const changeImage = await changeProfileImage(matricula, uri);

      if (changeImage.result) {
        Alert.alert('Sucesso', 'Imagem de perfil atualizada!');
        setImagemExistente(uri);
        setUri(null);
        await handleGetImage(); // Recarregar a imagem do servidor
      } else {
        Alert.alert('Erro ao enviar Imagem', changeImage.error = 'Network Error' ? 'Erro de conexão. Verifique sua internet e tente novamente.' : changeImage.error || 'Desculpe. Ocorreu um erro no servidor.');
      }
   
      setUploading(false);
    }
  }
  


  return (
    <>
  { camera ? 
      (permission && permission.granted ?
        <SafeAreaView  style={{flex:1, zIndex:1000, position:'absolute', width:'100%', height:'100%'}}>
      <CameraView
        style={{flex:1, width:'100%', height:'130%', position: 'absolute'}}
        facing={type}
        ref={camRef}/>
        
          
              <View style={{
                position: 'absolute',
                width: '100%',
                height: 200,
                backgroundColor: 'rgba(0,0,0,0.8)',
                flexDirection:'row', 
                justifyContent:'space-around',
                alignItems:'center',
                marginTop: '150%',
                
                
                }}>
              <TouchableOpacity 
              onPress={()=>{
                setType(
                type === 'back' ? 'front' : 'back'
                )}}>
                <Ionicons name="camera-reverse" size={30} color="gray" 
                style={{marginBottom: 45}}/>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={take}>
                <Ionicons name="checkmark-circle" size={70} color="white" 
                style={{marginBottom: 30, borderWidth: 8, borderColor: 'white', borderRadius: 50}}/>
              </TouchableOpacity>

               <TouchableOpacity
                onPress={() => setCamera(false)}>
                <Ionicons name="exit" size={50} color="gray" 
                style={{marginBottom: 25}}/>
              </TouchableOpacity>
              </View>
            
       
        </SafeAreaView>
        : <View> 
            <Text>É necessário permitir o uso da câmera</Text>
            <Pressable onPress={requestPermission} title="grant permission"/>
        </View> ) 
        : <View/>}

    <ScrollView style={styles.Container}>
     

      <View style={styles.Navbar}>
        <Ionicons name='arrow-back' size={30} color={colors.on_nav_bar} onPress={() => route.back(goBack)} />
        <Text style={styles.NavbarText}> Perfil</Text>
        <Octicons name="bell" color={colors.on_nav_bar} size={30} onPress={() => route.push('/main/notification')} />
      </View>

      <View style={styles.Content}>

        <View style={styles.Circle}>
            {uploading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <>
          { uri || imagemExistente ? (
            <Image source={{uri: uri || imagemExistente}} 
            style={{width: 140, height: 140, borderRadius: 75}} 
            /> ) : (
          <Feather name="user" size={130} color={colors.on_background} />
          )}
          </>
          )}
            <TouchableOpacity 
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: colors.primary,
              borderRadius: 20,
              marginRight: -25,
            }}
            onPress={handleOpenCamera}>
            <Feather name="edit" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.UserContainer}>

        <View>
          <Text style={{ 
            fontFamily: 'Montserrat-Bold', 
            fontSize: 26,
            color: colors.text }}>
              {infos.name}
          </Text>
        </View>     

        <View>
          <Text style={styles.UserInfo}>N° de Matrícula:</Text>
          <Text style={styles.UserInfoAuth}>{infos.registration}</Text>
          <Text style={styles.UserInfo}>Telefone:</Text>
          <Text style={styles.UserInfoAuth}>{infos.telefone}</Text>
          <Text style={styles.UserInfo}>Email:</Text>
          <Text style={styles.UserInfoAuth}>{infos.email}</Text>
          <Text style={styles.UserInfo}>Setor:</Text>
          <Text style={styles.UserInfoAuth}>{infos.sector}</Text>
          <Text style={styles.UserInfo}>Cargo:</Text>
          <Text style={styles.UserInfoAuth}>{infos.position}</Text>
       </View>

        <View>
          <Pressable style={styles.button_confirm}>
            <Text style={styles.button_text} onPress={()=> route.push(`/main/update-profile`)}>ATUALIZAR DADOS</Text>
          </Pressable>
          <Pressable style={styles.button_cancel} >
            <Text style={styles.button_text} onPress={()=> route.push(`/main/update-password`)}>REDEFINIR SENHA</Text>
          </Pressable>
          </View>  
        </View>

      </View>
    </ScrollView>
    </>
  )
}
