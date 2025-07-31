import { Stack } from "expo-router"
import { Image, Text, View } from "react-native"
import { useTheme } from 'styled-components/native'


export default function MainLayout() {
 const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.defaultColor,
        headerBackVisible: false,
      headerTitle: () => (
        <View style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 100
        }}>
          <View style={{
            justifyContent: "center",
            alignItems: "center",

          }}>
            <Text style={{
              fontFamily: 'Montserrat-regular',
              color: colors.onBackground
            }}> Secretaria de </Text>

            <Text style={{
              color: colors.defaultColor,
              fontFamily: 'Montserrat-SemiBold'
            }}> MOBILIDADE URBANA</Text>
          </View>
          <Image style={{borderColor: colors.onBackground }}source={require('../../assets/images/header.png')}
          />
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
    </Stack>
  )
}