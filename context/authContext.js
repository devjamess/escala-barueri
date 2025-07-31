import { supabase } from '../lib/supabase';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const verifyEmail = async (email) => {
        const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();

        if (error || !data) {
            return false; 
    } 
    return true;
    };


    const signIn = async (matricula, senha) => {
        try {
            const { user: authUser, error } = await supabase.auth.signInWithPassword({
                email: matricula,
                password: senha,
            });
            if (error) {
                console.error('Erro ao fazer login:', error.message);
                return null;
            }
            setUser(authUser);
            return authUser;

        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
            return null;
        }
    };

    const signoOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };
    
    const resetPassword = async (email) => {
        try{
            const {data, error} = await supabase.auth.resetPasswordForEmail(email);
            if (error) {
                console.error('Erro ao enviar email de recuperação:', error.message);
                return null;
            }
            return data            
        } catch (error) {
            console.error('Erro ao enviar email de recuperação:', error.message);
            return null;
        }
    };

    useEffect(() => {
    // Função assíncrona para obter a sessão inicial
    const getSession = async () => {
      const { data: session, error } = await supabase.auth.getSession(); // Usando await para aguardar a Promise
      if (error) {
        console.error('Erro ao obter sessão:', error.message);
      } else {
        setUser(session?.user || null);
      }
      setLoading(false); // Após obter a sessão ou erro, definimos o loading como false
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null); 
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

    if(loading) return null;

    return (
        <AuthContext.Provider value={{ user, verifyEmail, signIn, signoOut, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
    };

