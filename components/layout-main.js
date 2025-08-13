import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: colors.background,
      },
      Navbar: {
        padding: 20,
        flexDirection: 'row',
        backgroundColor: colors.nav_bar,
        justifyContent: 'flex-start',
        gap: 50,
        alignItems: 'center'
      },
      NavbarText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 32,
        color: colors.on_nav_bar
      },



      //main/index
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
      notificationContainer: {
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
      notificationContent: {
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



      //main/profile
      Content: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    
      },
      Circle: {
        padding: 40,
        borderWidth: 3,
        borderColor: colors.on_background,
        borderRadius: 150,
        backgroundColor: colors.content_light,
        
        justifyContent: 'center',
        alignItems: 'center'
      },
      UserContainer:{
          marginTop: 20,
          padding: 20,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center'
          
      }

})