
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  fundoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Titulo: {
    fontSize: 40,
    color: '#111827',
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: '#111827',
    borderWidth: 5,
    borderTopRightRadius: '15%',
    borderTopLeftRadius: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tituloInput: {
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 1,
    marginBottom: 30,
    color: '#111827'
  },
  Input: {
    placeholderTextColor: '#111827',
    color: '#111827',
    fontFamily: 'Montserrat-Regular',
    width: 300,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#111827',
    borderRadius: 20,
    marginBottom: 40,
  },
  botaoInput: {
    width: 300,
    height: 50,
    backgroundColor: '#111827',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 20,

    // iOS Shadow
    boxShadow: '5px 7px 3.84px rgba(0, 0, 0, 0.3)',

    // Android Shadow
    elevation: 10,
  },
  textBotaoInput: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 5,
    fontSize: 20,
  },
  textTrocarInput: {
    color: '#111827',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    letterSpacing: 2,
    textDecorationLine: 'underline',
    underlineColor: '#111827',
  },
});