import { View, ScrollView, Text, Switch } from "react-native";
import { Ionicons, MaterialCommunityIcons, AntDesign, Entypo, Octicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components/native';
import { goBack } from "expo-router/build/global-state/routing";
import { useContext } from "react";
import {ThemeContext, ThemeType} from '../../theme/Theme';
import {main_styles} from '../../hook/useStyleMain';

export default function Config() {
  const route = useRouter();
 const { colors } = useTheme();
  const styles = main_styles(colors);

  const {toggleTheme, theme} = useContext(ThemeContext)
  const isDarkMode = theme === ThemeType.dark

  return (
    <ScrollView style={styles.Container}>
      <View style={styles.Navbar}>
        <Ionicons name="arrow-back" size={30} color={colors.on_nav_bar} onPress={() => route.back(goBack)} />
        <Text style={styles.NavbarText}> Configurações </Text>
        <Octicons name="bell" color={colors.on_nav_bar} size={30} onPress={() => route.push('/main/notification')} />
      </View>

      <View style={styles.OptionsContainer}>
        <View style={styles.OptionsIcon}>
          <Ionicons name='sunny-sharp' size={50} color={colors.icons_config} style={styles.IconsBorder} />
          <Text style={styles.OptionText}> Tema Escuro</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>

        <View style={styles.OptionsIcon}>
          <MaterialCommunityIcons name="human-handsup" size={50} color={colors.icons_config} style={styles.IconsBorder} />
          <Text style={styles.OptionText}> Acessibilade </Text>
        </View>

        <View style={styles.OptionsIcon}>
          <AntDesign name="questioncircle" size={50} color={colors.icons_config} style={styles.IconsBorder} />
          <Text style={styles.OptionText}> Sobre </Text>
        </View>

        <View style={styles.OptionsIcon}>
          <Entypo name="info-with-circle" size={50} color={colors.icons_config} style={styles.IconsBorder} />
          <Text style={styles.OptionText}> Termos e Condições </Text>
        </View>

        <View style={styles.OptionsIcon}>
          <Ionicons name="lock-closed-sharp" size={50} color={colors.icons_config} style={styles.IconsBorder} />
          <Text style={styles.OptionText}> Política e Privacidade </Text>
        </View>
      </View>
    </ScrollView>
  )
}

