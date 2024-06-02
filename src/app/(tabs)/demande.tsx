import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Bouton';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

const Demande: React.FC = () => {
  const listeAdresse = [
    {adresseComplete: '23 Rue du Dépot, 62000 Arras'},
    {adresseComplete: '35 rue Moïse LAMBERT, 59148 Flines-lez-Râches'},
    {adresseComplete: '12 rue de Cambrai, 59000 Lille'}
  ];
  const [region, setRegion] = useState<{
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number} | null>(null);
  const [adresseSelectionne, setAdresseSelectionne] = useState(false);
  const [chargement, setChargement] = useState(true);
  const [montrerCalendrier, setMontrerCalendrier] = useState(false);

  const geocodeAddress = async (adresse: any) => {
    setChargement(true);
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org?q='+adresse.adresseComplete+'&format=json');
      if (response.data.length > 0) {
        const location = response.data[0];
        setRegion({
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lon),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setChargement(false);
    }
  };

  const selectAdresse = (adresse: any) => {
    setAdresseSelectionne(true);
    geocodeAddress(adresse);
  };

  const selectPeriod = (day: DateData) => {
    console.log(day)
    console.log('Period selected!')
  };

  const envoyerDemande = () => {
    console.log('Demande envoyée !')
  };

  /*
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setEndDate(date);
      setShowCalendar(false);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };*/

  let periode = {
    '2012-05-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
    '2012-05-22': {color: '#70d7c7', textColor: 'white'},
    '2012-05-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
    '2012-05-24': {color: '#70d7c7', textColor: 'white'},
    '2012-05-25': {endingDay: true, color: '#50cebb', textColor: 'white'}
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Demande de garde</Text>
          <View style={styles.topline}><Text style={styles.textTopline}></Text></View>
        </View>
        <View style={styles.div}>
        <SelectDropdown
            data={listeAdresse}
            onSelect={(selectedItem, index) => {
              selectAdresse(selectedItem);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.adresseComplete) || 'Choisir une adresse'}
                  </Text>
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.adresseComplete}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
          { adresseSelectionne ?(!chargement ? (region ?(<MapView
            style={styles.map}
            region={region}
          >
            <Marker coordinate={region} />
          </MapView>) : (
            <Text>Un problème est survenu</Text>
          )) : (<Text>Chargement en cours...</Text>)) : (<Text></Text>)}
          <Button buttonStyle={styles.buttons} textStyle={styles.buttonsText} title={'Plage de temps'} onPress={ () => {setMontrerCalendrier(true);}}></Button>
          {montrerCalendrier ? (<Calendar
            firstDay={1}
            style={styles.calendar}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e',
            }}
            markingType={'period'}
            onDayPress={day => {
              selectPeriod(day)
            }}
          />) : (<Text></Text>)}
          <Button buttonStyle={styles.envoyerDemandeButton} textStyle={styles.envoyerDemandeText} title={'Envoyer la demande'} onPress={envoyerDemande}></Button>
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
  buttonsText: {
    color: '#000000',
    fontFamily: 'KaushanScript',
    textAlign: 'center',
    fontSize: 24
  },
  buttons: {
    backgroundColor: 'rgba(135, 185, 152, 0.49)',
    borderRadius: 10,
    paddingVertical: 15,
    width: '90%',
    marginTop: 30
  },
  map: {
    marginTop: 20,
    aspectRatio: 1,
    width: '90%'
  },
  dropdownButtonStyle: {
    backgroundColor: 'rgba(135, 185, 152, 0.49)',
    borderRadius: 10,
    paddingVertical: 15,
    width: '90%',
    marginTop: 30
  },
  dropdownButtonTxtStyle: {
    color: '#000000',
    fontFamily: 'KaushanScript',
    textAlign: 'center',
    fontSize: 24
  },
  dropdownButtonArrowStyle: {
    fontSize: 24,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    color: '#000000',
    fontFamily: 'KaushanScript',
    textAlign: 'center',
    fontSize: 24,
    width: '90%'
  },
  dropdownItemIconStyle: {
    color: '#000000',
    fontFamily: 'KaushanScript',
    textAlign: 'center',
    fontSize: 24
  },
  envoyerDemandeText: {
    color: '#FFFFFF',
    fontFamily: 'KaushanScript',
    textAlign: 'center',
    fontSize: 24
  },
  envoyerDemandeButton: {
    backgroundColor: '#86B883',
    borderRadius: 10,
    paddingVertical: 15,
    width: '90%',
    marginTop: 50
  },
  calendar: {
    marginTop: 20,
    aspectRatio: 1,
    width: '90%'
  },
});

export default Demande;
