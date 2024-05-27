// src/components/Login.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, GestureResponderEvent, ScrollView } from 'react-native';
import Card from '../../components/Card';
import Button from '../../components/Bouton';
import { router } from 'expo-router';

const backgroundImage = require('#/images/background.jpeg');
const logoImage = require('#/images/logo.png');


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handlePress = () => {
    console.log('Bouton pressé');
  };

  const handleSubmit = () => {
    // Ajouter la logique de soumission ici
    console.log('redirection');
    router.replace('./accueil');
  };

  function handleRedirect(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <TextInput placeholder='Email' placeholderTextColor={'#888686'} value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput placeholder='Password' placeholderTextColor={'#888686'} value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.input} />
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
    marginTop: -200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 350,
    height: 330,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    fontFamily: 'Kaushan Script',
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
    borderWidth: 2,
    borderColor: '#888686',
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
