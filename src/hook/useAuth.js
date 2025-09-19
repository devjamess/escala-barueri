import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const useAuth = () => {
  const { 
    user, 
    signIn, 
    signOut, 
   /* scales,
    regions,
    teams 
    resetPassword, verifyEmail*/ } = useContext(AuthContext);

  return {
    user,
    signIn,
    signOut,
    /*scales,
    regions,
    teams,
    //resetPassword,
    //verifyEmail,*/
  };
};

