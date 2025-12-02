import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Pressable, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import { Ionicons, Feather, Octicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { goBack } from 'expo-router/build/global-state/routing'
import { useTheme } from 'styled-components/native';
import { useAuth } from '../../hook/useAuth';
import {main_styles} from '../../hook/useStyleMain'
import {Camera} from 'expo-camera'

export default function Profile() {
  const route = useRouter();
  const { colors } = useTheme();
  const { user, uploadProfileImage, getProfileImage } = useAuth();
  const styles = main_styles(colors)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const camRef = useRef(null);
  const [uri, setUri] = useState(null);
  const [camera, setCamera] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagemExistente, setImagemExistente] = useState(null);

  useEffect(() => {
    (async ()=>{
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  },[])

  // Carregar imagem existente ao montar o componente
  useEffect(() => {
    if (user?.funcionario?.matricula_funcionario) {
      carregarImagemPerfil();
    }
  }, [user]);

  const carregarImagemPerfil = async () => {
    const matricula = user?.funcionario?.matricula_funcionario;
    const { result, error } = await getProfileImage(matricula);
    
    if (result) {
      setImagemExistente(result);
    }
  }

  async function take(){
    if(camRef){
      const data = await camRef.current.takePictureAsync();
      setUri(data.uri)
      console.log(data);
      setCamera(false)
      // NÃO chame handleImage aqui! O usuário pode querer ver a foto primeiro
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

  const handleImage = async() => {
    if (!uri) {
      Alert.alert('Erro', 'Tire uma foto primeiro!');
      return;
    }

    setUploading(true);

    try {
      const matricula = user?.funcionario?.matricula_funcionario
      const { result, error } = await uploadProfileImage(matricula, uri)
      
      if(result){
        Alert.alert('Sucesso', 'Imagem de perfil atualizada!');
        setImagemExistente(uri); // Atualizar preview
        setUri(null); // Limpar foto temporária
        await carregarImagemPerfil(); // Recarregar do servidor
      } else {
        Alert.alert('Erro', error || 'Erro ao enviar imagem');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro inesperado ao enviar imagem');
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <ScrollView style={styles.Container}>
      
     { camera ? 
      (hasPermission !== null && hasPermission !== false ?
      <Camera
        style={{flex:1, height: 600}}
        type={type}
        ref={camRef}>
          <View 
          style={{
            flex:1, 
            backgroundColor:'transparent', 
            flexDirection:'row'}}>
              <TouchableOpacity style={{
                position:'absolute',
                bottom:20,
                left:20
              }}
              onPress={()=>{ setType(
                type===Camera.Constants.Type.back ?
                Camera.Constants.Type.front :
                Camera.Constants.Type.back)}}>
                <Ionicons name="camera-reverse" size={40} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
              style={{
                position:'absolute',
                bottom:20,
                alignSelf: 'center'
              }} 
              onPress={take}>
                <Ionicons name="checkmark-circle" size={70} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
              style={{
                position:'absolute',
                bottom:20,
                right:20
              }} 
              onPress={() => setCamera(false)}>
                <Ionicons name="close-circle" size={40} color="white" />
              </TouchableOpacity>
            </View>
        </Camera> 
        : <View><Text>Sem permissão de câmera</Text></View> 
      ) : <View/>}

      <View style={styles.Navbar}>
        <Ionicons name='arrow-back' size={30} color={colors.on_nav_bar} onPress={() => route.back(goBack)} />
        <Text style={styles.NavbarText}> Perfil</Text>
        <Octicons name="bell" color={colors.on_nav_bar} size={30} onPress={() => route.push('/main/notification')} />
      </View>

      <View style={styles.Content}>

        <View style={styles.Circle}>
          <View style={{ position: 'relative' }}>
            { uri ? (
              <Image 
                source={{uri: uri}} 
                style={{ width: 130, height: 130, borderRadius: 65 }}
              />
            ) : imagemExistente ? (
              <Image 
                source={{uri: imagemExistente}} 
                style={{ width: 130, height: 130, borderRadius: 65 }}
              />
            ) : (
              <Feather name="user" size={130} color={colors.on_background} />
            )}
            
            <TouchableOpacity
              onPress={()=>setCamera(true)}
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            >
              <Feather name="edit" size={40} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Mostrar botões apenas quando tem uma foto nova */}
        {uri && (
          <View style={{ marginTop: 20, width: '100%' }}>
            {uploading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <>
                <Pressable 
                  style={[styles.button_confirm, { marginBottom: 10 }]} 
                  onPress={handleImage}
                >
                  <Text style={styles.button_text}>SALVAR FOTO</Text>
                </Pressable>
                <Pressable 
                  style={styles.button_cancel} 
                  onPress={() => setUri(null)}
                >
                  <Text style={styles.button_text}>DESCARTAR FOTO</Text>
                </Pressable>
              </>
            )}
          </View>
        )}

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
  )
}