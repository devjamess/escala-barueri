import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider as ThemeProviderStyled } from "styled-components/native";
import {darkTheme} from './darkTheme'
import {lightTheme} from './lightTheme'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeType = {
  light : 'light',
  dark: 'dark',
}

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => { },
})

const themes = {
  light: lightTheme,
  dark: darkTheme
}

export const ThemeProvider = ({ children }) => {
  /* propiedade children (component filho) */
  const [theme, setTheme] = useState(ThemeType.light)

useEffect(() => {
  loadTheme()
}, [])
async function loadTheme() {
  const savedTheme = await AsyncStorage.getItem('@theme');
  if(savedTheme) {
    setTheme(savedTheme)
  }
}
 async function toggleTheme() {
    let selectTheme;
 if (theme === ThemeType.light) {
  selectTheme = ThemeType.dark
 } else {
  selectTheme = ThemeType.light
 }

 setTheme(selectTheme)
await AsyncStorage.setItem('@theme', selectTheme)
  }

return(
  <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <ThemeProviderStyled theme={themes[theme]}>
      {children}
    </ThemeProviderStyled>
  </ThemeContext.Provider>
);

};