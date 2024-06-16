import React, { useState } from 'react';
import Button from '@/components/Bouton';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AjouterAdresse = () => {

  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');

  const envoyerAdresse = () => {
    console.log('Demande envoyée !')
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Ajouter une adresse</Text>
          <View style={styles.topline}><Text style={styles.textTopline}></Text></View>
        </View>
        <View style={styles.div}>
        <TextInput blurOnSubmit={false} placeholder='Rue' placeholderTextColor={'#888686'} value={streetAddress} onChangeText={setStreetAddress} autoCapitalize="none" returnKeyType="next" enterKeyHint='next' style={styles.input} />
            <TextInput blurOnSubmit={false} placeholder='Ville' placeholderTextColor={'#888686'} value={city} onChangeText={setCity} autoCapitalize="none" returnKeyType="next" enterKeyHint='next' style={styles.input} />
            <TextInput blurOnSubmit={false} placeholder='Code postal' placeholderTextColor={'#888686'} value={postalCode} onChangeText={setPostalCode} autoCapitalize="none" returnKeyType="next" enterKeyHint='next' style={styles.input} />
            <TextInput blurOnSubmit={false} placeholder='Région' placeholderTextColor={'#888686'} value={region} onChangeText={setRegion} autoCapitalize="none" returnKeyType="next" enterKeyHint='next' style={styles.input} />
            <TextInput blurOnSubmit={false} placeholder='Pays' placeholderTextColor={'#888686'} value={country} onChangeText={setCountry} autoCapitalize="none" returnKeyType="next" enterKeyHint='next' style={styles.input} />
            <Button buttonStyle={styles.envoyerAdresseButton} textStyle={styles.envoyerAdresseText} title={'Ajouter l\'adresse'} onPress={envoyerAdresse}></Button>
        </View>
      </ScrollView>
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F1F0',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100
  },
  header: {
    height: 75,
    backgroundColor: '#E6F1F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    color: '#47635C',
    fontFamily: 'KaushanScript',
    fontSize: 25,
  },
  div: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  topline: {
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1.5,    
  },
    textTopline: {
    textAlign: 'center',
    color: '#47635C',
    fontFamily: 'KaushanScript',
    fontSize: 25,
  },
  image: {
    width: '90%',
    marginTop: 20,
    aspectRatio: 1
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#888686',
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(135, 185, 152, 0.49)',
    marginTop: 20,
  },
  ajouterImageText: {
    color: '#FFFFFF',
    fontFamily: 'KaushanScript',
    textAlign: 'center',
    fontSize: 24
  },
  ajouterImageButton: {
    backgroundColor: 'rgba(135, 185, 152, 0.49)',
    borderRadius: 10,
    paddingVertical: 15,
    width: '90%',
    marginTop: 30
  },
  sourceImageText: {
    color: '#FFFFFF',
    fontFamily: 'KaushanScript',
    textAlign: 'center',
    fontSize: 20
  },
  sourceImageButton: {
    backgroundColor: 'rgba(135, 185, 152, 0.49)',
    borderRadius: 10,
    paddingVertical: 15,
    width: '75%',
    marginTop: 20
  },
  envoyerAdresseText: {
    color: '#FFFFFF',
    fontFamily: 'KaushanScript',
    textAlign: 'center',
    fontSize: 24
  },
  envoyerAdresseButton: {
    backgroundColor: '#86B883',
    borderRadius: 10,
    paddingVertical: 15,
    width: '90%',
    marginTop: 50
  },
});

export default AjouterAdresse;

