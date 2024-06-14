import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Layout from '../(tabs)/_layout';
import Button from '../../components/Bouton';
import PagerView from 'react-native-pager-view';

const Plante_Entretien = require('#/images/plante_entretien.png');
const Plante_Notification = require('#/images/notification.png');

const Garde: React.FC = () => {
  const { id } = useLocalSearchParams();
  const pagerRef = useRef<PagerView>(null);
  console.log(id);

  const handleEntretienPress = (num: number) => {
    router.push(`../entretien/${num}`);
  };
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']} >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Garde {id}</Text>
        </View>
        <View style={styles.div}>
          <View style={styles.topline}>
            <Text style={styles.textTopline}>Prochain Entretiens</Text>
          </View>
          <View style={styles.caroussel}>
            <PagerView ref={pagerRef} style={styles.containercarousel} initialPage={0}>
              {[1, 2, 3].map(num => (
                <View style={styles.blurContainer} key={num}>
                  <View style={styles.imagecontainer}>
                    <Image source={Plante_Entretien} style={styles.image_plante_entretien} />
                    <Button title={`Notification
                    
                    ${num}`} onPress={() => handleEntretienPress(num)} buttonStyle={styles.Style_Button} textStyle={styles.customButtonText} />
                  </View>
                </View>
              ))}
            </PagerView>
          </View>
        </View>
        <View style={styles.div}>
          <View style={styles.topline}>
            <Text style={styles.textTopline}>Notifications Botanistes</Text>
          </View>
          <View style={styles.caroussel}>
            <PagerView ref={pagerRef} style={styles.containercarousel} initialPage={0}>
              {[1, 2, 3].map(num => (
                <View style={styles.blurContainer} key={num}>
                  <View style={styles.imagecontainer}>
                    <Image source={Plante_Notification} style={styles.image_plante_entretien} />
                    <Button title={`Entretien ${num}`} onPress={() => handleEntretienPress(num)} buttonStyle={styles.Style_Button} textStyle={styles.customButtonText} />
                  </View>
                </View>
              ))}
            </PagerView>
          </View>
        </View>
        <View style={styles.div}>
          <View style={styles.topline}>
            <Text style={styles.textTopline}>Entretiens Précédent</Text>
          </View>
          <View style={styles.caroussel}>
            <PagerView ref={pagerRef} style={styles.containercarousel} initialPage={0}>
              {[1, 2, 3].map(num => (
                <View style={styles.blurContainer} key={num}>
                  <Image source={Plante_Entretien} style={styles.image_plante_entretien} />
                  <Button title={`Garde ${num}`} onPress={() => handleEntretienPress(num)} buttonStyle={styles.Style_Button} textStyle={styles.customButtonText} />
                </View>
              ))}
            </PagerView>
          </View>
        </View>
      </ScrollView>
      <Layout />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F1F0',
    height: '90%',
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
    height: 450,
    justifyContent: 'center',
  },
  blurContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
  imagecontainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(127, 196, 150, 0.7)',
    height: '100%',
  },
  image_plante_entretien: {
    width: 200,
    height: 240,
    borderRadius: 20,
  },
  Style_Button: {
    flex: 1,
    alignItems: 'center',
    width: 240,
    height: 240,
    textAlign: 'center',
    alignContent: 'center',
    marginTop: -180,
  },
  customButtonText: {
    color: 'white',
    fontSize: 24,
    position: 'absolute',
    top: 200,
  },
  containercarousel: {
    marginTop: 20,
    height: 300,
    backgroundColor: '#E6F1F0',
  },
});

export default Garde;
