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
    holidays,
    reminders,
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
    holidays,
    reminders,
    /*scales,
    regions,
    teams,
    //resetPassword,
    //*/
  };
};

