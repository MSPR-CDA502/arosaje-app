import { useStorageState } from '@/hooks/useStorageState';
import { router } from 'expo-router';
import React from 'react';

const AuthContext = React.createContext<{
  signOut: () => void;
  session?: string | null;
  user?: string | null;
  isLoading: boolean;
}>({
  signOut: () => null,
  session: null,
  user: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const signOut = () => {
    console.log('signOut');

    setSession(null);
    router.replace('/sign-in');
  }

  return (
    <AuthContext.Provider
      value={{
        signOut: signOut,
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
