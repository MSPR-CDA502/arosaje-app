import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { Slot, useRouter, Redirect } from 'expo-router';

export default function Layout() {
  const router = useRouter();

  const handleButtonPress = (route: string) => {
    router.replace(route);
  };

  // Si ce n'est pas la page de connexion, rend la barre de navigation inférieure
  return (
    <View style={styles.container}>
      <Slot />
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => handleButtonPress('/chat')} style={styles.navButton}>
          <Image source={require('#/images/chat.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleButtonPress('/plantes')} style={styles.navButton}>
          <Image source={require('#/images/plantes.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleButtonPress('/accueil')} style={styles.navButton}>
          <Image source={require('#/images/home.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleButtonPress('/botanistes')} style={styles.navButton}>
          <Image source={require('#/images/botanistes.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleButtonPress('/gardes')} style={styles.navButton}>
          <Image source={require('#/images/gardes.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navButton: {
    padding: 10,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
});
