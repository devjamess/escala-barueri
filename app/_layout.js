import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { ActivityIndicator } from "react-native";
import { ThemeProvider } from '../theme/Theme';
//import {AuthProvider} from '../context/authContext';
export default function Layout() {
  const [fontLoad] = useFonts({
    'Montserrat-Regular': require('../constants/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../constants/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('../constants/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../constants/fonts/Montserrat-SemiBold.ttf'),
  });
  if (!fontLoad) {
    return <ActivityIndicator size="large" color="#f4511e" />;
  }


  return (
     <ThemeProvider>
      
      <Stack>
        <Stack.Screen
          name='index'
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='email'
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='telefone'
          options={{ headerShown: false }}
        />


        <Stack.Screen
          name='main'
          options={{ headerShown: false }} />


      </Stack>
     
     </ThemeProvider>
    




  )
}