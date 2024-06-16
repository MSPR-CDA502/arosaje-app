import { Alert, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { TokenResponse, TokenResponseConfig, exchangeCodeAsync, fetchUserInfoAsync, makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { useStorageState } from '@/hooks/useStorageState';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const discovery = useAutoDiscovery('https://auth.nimzero.fr/realms/arosaje');
  const [[isLoading, session], setSession] = useStorageState('session');
  const [code, setCode] = useState<string | null>(null);
  const [token, setToken] = useState<TokenResponse | null>(null);

  const [request, result, promptAsync] = useAuthRequest(
    {
      clientId: 'arosaje-app',
      redirectUri: makeRedirectUri({
        scheme: 'mspr-arosaje',
        path: 'sign-in'
      }),
      scopes: ['openid', 'profile'],
    },
    discovery
  );

  useEffect(() => {
    if (result) {
      console.log(result);

      if (result.error) {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        );
        return;
      }
      if (result.type === 'success') {
        setCode(result.params.code);
      }
    }
  }, [result]);

  useEffect(() => {
    if (code) {
      console.log(code);

      exchangeCodeAsync(
        {
          code: code,
          clientId: 'arosaje-app',
          redirectUri: makeRedirectUri({
            scheme: 'mspr-arosaje',
            path: 'sign-in'
          }),
          extraParams: {
            code_verifier: request?.codeVerifier
          }
        },
        discovery
      )
        .then(data => {
          console.log(data);
          setToken(data);
        })
        .catch(err => console.log(err));
    }
  }, [code]);

  useEffect(() => {
    if (token) {
      console.log(token);

      const tokenConfig: TokenResponseConfig = token.getRequestConfig();
      console.log(tokenConfig);
      setSession(tokenConfig.accessToken);

      fetchUserInfoAsync(
        {
          accessToken: tokenConfig.accessToken,
        },
        discovery
      )
        .then(data => {
          console.log(data);
          router.replace('/accueil');
        })
        .catch(err => console.log(err));
    }
  }, [token]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText
        onPress={() => promptAsync()}>
        Sign In
      </ThemedText>
    </View>
  );
}
