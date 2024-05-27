// src/components/Login.tsx

import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, GestureResponderEvent, ScrollView, Alert } from 'react-native';
import Card from '@/components/Card';
import Button from '@/components/Bouton';
import { router } from 'expo-router';

const backgroundImage = require('#/images/background.jpeg');
const logoImage = require('#/images/logo.png');


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef<TextInput>(null);

  const handleSubmit = async () => {
    const url = process.env.EXPO_PUBLIC_KEYCLOACK_URL + '/realms/' + process.env.EXPO_PUBLIC_KEYCLOACK_REALM + '/protocol/openid-connect/token';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = new URLSearchParams({
      'client_id': process.env.EXPO_PUBLIC_KEYCLOACK_CLIENT_ID,
      'grant_type': 'password',
      'client_secret': process.env.EXPO_PUBLIC_KEYCLOACK_CLIENT_SECRET,
      'scope': 'openid',
      'username': email,
      'password': password,
    }).toString();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      router.replace('accueil');
      Alert.alert('Success', JSON.stringify(data));
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  function handleRedirect(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.scrollContainer}>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.container_logo}>
          <View style={styles.logo}>
            <ImageBackground source={logoImage} style={styles.logoimage} />
          </View>
        </View>
        <View style={styles.container_login}>
          <Card style={styles.card}>
            <Text style={styles.titre}>
              Identification :
            </Text>
            <TextInput onSubmitEditing={() => {passwordRef.current.focus(); }} blurOnSubmit={false} placeholder='Email' placeholderTextColor={'#888686'} value={email} onChangeText={setEmail} autoCapitalize="none" returnKeyType="next" enterKeyHint='next' style={styles.input} />
            <TextInput ref={passwordRef} onSubmitEditing={handleSubmit} placeholder='Password' placeholderTextColor={'#888686'} value={password} onChangeText={setPassword} autoCapitalize="none" returnKeyType='go' secureTextEntry autoCorrect={false} style={styles.input} />
            <Button title="Se connecter" onPress={handleSubmit} buttonStyle={styles.customButton} textStyle={styles.customButtonText} />
            <TouchableOpacity onPress={handleRedirect}>
              <Text style={styles.link}>Inscription</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container_logo: {
    flex: 1,
    width: 430,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 270, // Ajustez la largeur de votre logo si nécessaire
    height: 150, // Ajustez la hauteur de votre logo si nécessaire
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoimage: {
    width: 247,
    height: 250,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  container_login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -300,
  },
  card: {
    width: 350,
    height: 330,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    fontFamily: 'KaushanScript',
    alignItems: 'center',
  },
  titre: {
    width: '100%',
    height: 50,
    textAlign: 'center',
    lineHeight: 50,
    fontSize: 24,
    fontFamily: 'KaushanScript',
    color: '#47635C',
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: '#888686',
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(127, 196, 150, 0.70)',
    marginBottom: 20,
  },
  customButton: {
    width: 200,
    height: 50,
    backgroundColor: '#7FC496',
    borderRadius: 50,
    shadowColor: '#66A57B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  customButtonText: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    lineHeight: 50,
    color: 'white',
    fontSize: 20,
  },
  link: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'KaushanScript',
    textDecorationLine: 'underline',
  }
});

export default Login;
