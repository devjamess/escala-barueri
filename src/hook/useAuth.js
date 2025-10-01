import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const useAuth = () => {
  const { 
    user, 
    signIn, 
    signOut, 
    confirm,
   /* scales,
    regions,
    teams 
    resetPassword, verifyEmail*/ } = useContext(AuthContext);

  return {
    user,
    signIn,
    signOut,
    confirm,
    /*scales,
    regions,
    teams,
    //resetPassword,
    //verifyEmail,*/
  };
};

