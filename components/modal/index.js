import { Pressable, Text, View, StyleSheet } from "react-native";
import React, {useState} from "react";
import { useTheme} from 'styled-components/native';


export default function PopUp() {
const { colors } = useTheme();
const [isOpen, setIsOpen] = useState(true);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#101a2e7a',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView:{
    width: '80%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
    gap: 10,
    borderRadius: 10,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
  },
  headerTitle:{
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: colors.text,
  },
  ContentText:{
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: colors.text,
  },
  Button:{
    backgroundColor: colors.button_confirm,
    borderRadius: 10,
    padding: 5,
  }
})
  if (isOpen) {
  return (

    <View style={styles.Container}>
      <View style={styles.modalView}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}> !ATUALIZAÇÃO NA ESCALA! </Text>
        </View>

        <View style={styles.Content}>
          <Text style={styles.ContentText}>
          Sua escala foi atualizada! por favor, confirme que ciente dessa atualização.
          </Text>
        </View>

        <View> 
          <Pressable style={styles.Button} onPress={()=> setIsOpen(false) }>
            <Text style={styles.ButtonText}> Confirmar</Text>
          </Pressable>
        </View>
      </View>
    </View>

  )
} return null;
}
