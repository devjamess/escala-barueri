import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const useAuth = () => {
  const { 
    user, 
    signIn, 
    signOut, 
    confirm,
    updateProfile,
    updatePassword,
    verifyEmail,
    verifyCode,
    holidays,
    reminders,
    uploadProfileImage,
   /* scales,
    regions,
    teams 
    resetPassword, */ } = useContext(AuthContext);

  return {
    user,
    signIn,
    signOut,
    confirm,
    updateProfile,
    updatePassword,
    verifyEmail,
    verifyCode,
    holidays,
    reminders,
    uploadProfileImage,
    /*scales,
    regions,
    teams,
    //resetPassword,
    //*/
  };
};

