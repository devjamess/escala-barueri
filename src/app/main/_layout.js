import { Stack } from "expo-router"
import { Image, Text, View } from "react-native"
import { useTheme } from 'styled-components/native'

export default function MainLayout() {
 const { colors } = useTheme();

  return (  
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.on_background,
        headerBackVisible: false,
      headerTitle: () => (
        <View style={{
          flex: 1,
          margin: 0,
          padding: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 50,
        }}>

          <View style={{
            justifyContent: "center",
            alignItems: 'center',
            flexDirection: "row",
            gap: 40
          }}>
          <View style={{ flex: 1}}>
            <Text style={{
              textAlign: "center",
              fontFamily: 'Montserrat-regular',
              color: colors.text
            }}> Secretaria de </Text>

            <Text style={{
              
              textAlign: "center",
              color: colors.on_background,
              fontFamily: 'Montserrat-Bold'
            }}> MOBILIDADE URBANA</Text>
        </View>
          <Image style={{ flex: 1, 
          height: 35, justifyContent: "center", 
          alignItems: "center", marginLeft: -20 }} 
          source={require('../../assets/images/semurb-logo-header.png')}
          />
          </View>
        </View>
      ),
    }}>

      <Stack.Screen
        name='index'

      />

      <Stack.Screen
      name="profile"
      />

      <Stack.Screen
      name="notification"
      />
      
      <Stack.Screen
      name='escale'
      />

      <Stack.Screen
      name="config"
      />

      <Stack.Screen
      name="update-profile"
      />

      <Stack.Screen
      name="update-password"
      />
    </Stack>  
  )}
