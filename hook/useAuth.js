import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const useAuth = () => {
  const { user, signUp, signIn, signOut, resetPassword, verifyEmail } = useContext(AuthContext);

  return {
    user,
    signUp,
    signIn,
    signOut,
    resetPassword,
    verifyEmail,
  };
};
