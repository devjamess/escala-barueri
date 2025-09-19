import {StyleSheet} from 'react-native'

export const main_styles = (colors) => StyleSheet.create({
  Container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    Navbar: {
      padding: 20,
      flexDirection: 'row',
      backgroundColor: colors.nav_bar,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    Navbar_index: {
      padding: 20,
      paddingHorizontal: 35,
      flexDirection: 'row',
      backgroundColor: colors.nav_bar,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    NavbarText: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 28,
      color: colors.on_nav_bar
    },

    //main/index.js
  User: {
    margin: 20,
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
    color: colors.on_background
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 20,
    gap: 20,
  },
  buttonCalendar: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    borderRadius: 15,
    backgroundColor: colors.button_main,
    aspectRatio: 1,
    elevation: 10,
  },
  buttonsRight: {
    flex: 1,
    justifyContent: 'space-around',
    gap: 15
  },
  buttonProfile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    borderRadius: 15,
    backgroundColor: colors.button_main,
    elevation: 10,

  },
  buttonConfig: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    borderRadius: 15,
    backgroundColor: colors.button_main,
    elevation: 10,
  },
  buttonText:{
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    fontSize: 17,
  },
  notificationContainer_index: {
    gap: 10,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContainerTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    backgroundColor: colors.content_light,
    width: '100%',
    textAlign: 'center',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    color: colors.text
  },
  notificationContent_index: {
    margin: 0,
    flex: 1,
    backgroundColor: colors.content_white,
    gap: 10,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    // iOS Shadow
    shadowColor: '#000000FF',
    shadowOffset: { width: 5, height: 7 },
    shadowOpacity: 0.76,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 10,
  },

  //main/escale.js
   CalendarDetails: {
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      flexDirection: 'row-reverse',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    CalendarDetailsTitle: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 18,
      padding: 10,
      color: colors.text
    },
    CalendarDetailsContent: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 20,
      marginHorizontal: 90,
      color: colors.text
    },
    Content_margin: {
      margin: 15
    },
    DetailsContainer: {
      flex: 1,
      margin: 20,
      borderRadius: 10,
      alignItems: 'center',
      gap: 15,
    },
    DetailsContainerTitle: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 20,
      textAlign: 'center',
      width: '100%',
      padding: 10,
      color: colors.text,
      backgroundColor: colors.content_light,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    },
    DetailsContent: {
      backgroundColor: colors.content_white,
      justifyContent: 'center',
      borderRadius: 10,
      padding: 10,
      width: '100%',
      // iOS Shadow
      shadowColor: '#000000',
      shadowOffset: { width: 5, height: 7 },
      shadowOpacity: 0.76,
      shadowRadius: 3.84,
      // Android Shadow
      elevation: 5,
    },
    DetailsContentTitle: {
      fontFamily: 'Montserrat-Bold', 
      fontSize: 18,
      color: colors.text
    },
    DetailsContentText: {
      fontFamily: 'Montserrat-Medium', 
      fontSize: 18,
      color: colors.text
    },

    //main/config.js
    OptionsContainer: {
      gap: 20,
      margin: 20,
    },
    OptionsIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 30
    },
    IconsBorder: {
      borderColor: colors.on_background,
      borderWidth: 2,
      borderRadius: 100,
      padding: 10,
      backgroundColor: colors.content_light,
    },
    OptionText: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 20,
      color: colors.text
    },

    //mian/notification.js
    FilterContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: colors.content_light,
    padding: 10
  },
  FilterText:{
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    marginHorizontal: 5,
    color: colors.text
  },
  notificationContainer: {
    flex: 1,
    gap: 10,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  notificationContent: {
    margin: 0,
    flex: 1,
    backgroundColor: colors.content_white,
    gap: 10,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
     // iOS Shadow
     shadowColor: '#000000',
     shadowOffset: { width: 5, height: 7 },
     shadowOpacity: 0.76,
     shadowRadius: 3.84,
     // Android Shadow
     elevation: 10,
  },
  detalhes:{
    backgroundColor: colors.transparent,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.text,
    color: colors.text,
    gap: 5,
    margin: 30,
  },

  //main/profile.js
  Content: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Circle: {
    padding: 20,
    borderWidth: 3,
    borderColor: colors.on_background,
    borderRadius: 150,
    backgroundColor: colors.content_light,
    justifyContent: 'center',
    alignItems: 'center'
  },
  UserContainer:{
    backgroundColor: colors.content_white,
    justifyContent: 'center',
      alignItems: 'start',
      width: '80%',
      gap: 30,
      margin: 20,
      padding: 20,
      borderRadius: 15,
     // iOS Shadow
      shadowColor: '#000000',
      shadowOffset: { width: 5, height: 7 },
      shadowOpacity: 0.76,
      shadowRadius: 3.84,
      // Android Shadow
      
      elevation: 10,
  },
  UserInfo:{
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: colors.text
  },
  UserInfoAuth:{
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: colors.text
  },


  button_confirm:{ 
    width: '100%',
    backgroundColor: colors.button_confirm, 
    padding: 7, 
    borderRadius: 10, 
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button_cancel:{ 
    width: '100%',
    backgroundColor: colors.button_cancel, 
    padding: 7, 
    borderRadius: 10, 
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  button_text:{
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 16,
  }
});