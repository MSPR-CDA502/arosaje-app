import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native'; // Import RouteProp from @react-navigation/native
import { useLocalSearchParams, useRouter } from 'expo-router';

const Garde: React.FC = () => {
    const { id } = useLocalSearchParams();

console.log(id);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Garde {id}</Text>
        </View>
        <View style={styles.div}>
          <View style={styles.topline}><Text style={styles.textTopline}>Prochain Entretiens</Text></View>
          <View style={styles.caroussel}></View>
        </View>
        <View style={styles.div}>
          <View style={styles.topline}><Text style={styles.textTopline}>Notifications Botanistes</Text></View>
          <View style={styles.caroussel}></View>
        </View>
        <View style={styles.div}>
          <View style={styles.topline}><Text style={styles.textTopline}>Entretiens Précédent</Text></View>
          <View style={styles.caroussel}></View>
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
  caroussel: {
    flex: 1,
    width: '100%',
    backgroundColor: '#E6F1F0',
  },
});

export default Garde;
