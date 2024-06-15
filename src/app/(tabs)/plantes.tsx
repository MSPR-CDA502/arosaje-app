import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Bouton';
import { router } from 'expo-router';
import {  Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');


const Plantes: React.FC = () => {
  const images = [require('#/images/plante_garde.png'), require('#/images/plante_garde.png'), require('#/images/plante_garde.png'), require('#/images/plante_garde.png'), require('#/images/plante_garde.png')];

    const handleDemande = () => {
      router.push('./demande'); // Navigate to the Demande page
    };

    const ajouterPlante = () => {
      router.push('./ajouterPlante'); // Navigate to the Demande page
    }

    const handlePlante = (num: number) => {
        router.replace(`plante/${num}`);
    }

  let  plantList =[];
  for (let index = 0; index < images.length; index++) {
    plantList.push(
      <View style={styles.planteContainer} key={index}>
        <Image source={images[index]} style={styles.planteImage}/>
        <Button title={`Plante ${index+1}`} onPress={() => {handlePlante(index+1)}} buttonStyle={styles.planteButton} textStyle={styles.planteButtonText}/>
      </View>
  );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Mes plantes</Text>
          <View style={styles.topline}><Text style={styles.textTopline}></Text></View>
        </View>
        <View style={styles.div}>
          <Button buttonStyle={styles.demandeButton} textStyle={styles.demandeText} title={'Faire une demande de garde'} onPress={handleDemande}></Button>
          <Button buttonStyle={styles.ajouterPlanteButton} textStyle={styles.ajouterPlanteText} title={'Ajouter une plante'} onPress={ajouterPlante}></Button>
          <View style={styles.planteList}>
            {plantList}
          </View>
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
  demandeText: {
    color: '#FFFFFF',
    fontFamily: 'KaushanScript',
    textAlign: 'center',
    fontSize: 24
  },
  demandeButton: {
    backgroundColor: '#A2B3A1',
    borderRadius: 10,
    paddingVertical: 15,
    width: '90%',
    marginTop: 50
  },
  ajouterPlanteText: {
    color: '#FFFFFF',
    fontFamily: 'KaushanScript',
    textAlign: 'center',
    fontSize: 24
  },
  ajouterPlanteButton: {
    backgroundColor: '#86B883',
    borderRadius: 10,
    paddingVertical: 15,
    width: '90%',
    marginTop: 50
  },
  planteList: {
    width: width * 0.9,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  planteContainer: {
    width: '40%',
    height: 200,
    margin: 10
  },
  planteImage: {
    width: '100%',
    height: 170,
    resizeMode: 'contain',
  },
  planteButton: {
    width: '100%',
    height: 200,
    marginTop: -170
  },
  planteButtonText: {
    color: '#47635C',
    width: '100%',
    fontSize: 20,
    position: 'absolute',
    top: 170,
    left: 10,
  }
});

export default Plantes;
