import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Bouton';
import { router } from 'expo-router';

const Demande: React.FC = () => {
  const handleAdresse = () => {
    router.push('./adresse'); // Navigate to the Adresse page
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Demande de garde</Text>
          <View style={styles.topline}><Text style={styles.textTopline}></Text></View>
        </View>
        <View style={styles.div}>
          <Button buttonStyle={styles.adresseButton} textStyle={styles.adresseText} title={'Choisir une adresse'} onPress={handleAdresse}></Button>
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
  adresseText: {
    color: '#000000',
    fontFamily: 'KaushanScript',
    fontSize: 24
  },
  adresseButton: {
    backgroundColor: '#87B998',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 80,
    marginTop: 30
  },
});

export default Demande;
