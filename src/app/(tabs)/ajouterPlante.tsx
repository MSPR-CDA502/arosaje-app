import React, { useEffect, useState } from 'react';
import Button from '@/components/Bouton';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';

const AjouterPlante = () => {
  const idUser = '1'
  const [plantName, setPlantName] = useState('');
  const [selectImage, setSelectImage] = useState(false);
  const [photo, setPhoto] = useState('');
  const [address, setAddress] = useState({});
  const [listeAdresse, setListeAdresse] = useState([
    {
      id: '1',
    city: 'Arras',
    country: '',
    streetAddress:  '23 Rue du Dépot',
    postalCode: '62000',
    region: ''},
    {
      id: '2',
    city: 'Flines-lez-Râches',
    country: '',
    streetAddress:  '35 rue Moïse LAMBERT',
    postalCode: '59148',
    region: ''
    },
    {
      id: '3',
    city: 'Lille',
    country: '',
    streetAddress:  '12 rue de Cambrai',
    postalCode: '59000',
    region: ''
    }
  ]);


  const envoyerPlante = async () => {
    try {
      const response = await axios.post('https://arosaje.nimzero.fr/api/plants', {
        owner: idUser,
        name: plantName,
        photos: photo,
        address: address
      })
    } catch (err) {
      console.error(err)
    }
    console.log('Demande envoyée !')
  };

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Désolé, nous avons besoin de cette permission pour fonctionner !');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    savePhoto(result);
  };

  const takePicture = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Désolé, nous avons besoin de cette permission pour fonctionner !');
        return;
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    savePhoto(result);
  };

  const savePhoto=(result: ImagePicker.ImagePickerResult) =>{
    if (!result.canceled) {
      setPhoto(result.assets[0].base64!);
    }
    setSelectImage(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://arosaje.nimzero.fr/api/users/'+idUser)
  
        setListeAdresse(response.data.addresses);
      } catch (err) {
        console.error(err)
      }
    };

  fetchData();
}, []); // Ensure dependency array is empty to run only once

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Ajouter une plante</Text>
          <View style={styles.topline}><Text style={styles.textTopline}></Text></View>
        </View>
        <View style={styles.div}>
            <TextInput blurOnSubmit={false} placeholder='Nom' placeholderTextColor={'#888686'} value={plantName} onChangeText={setPlantName} autoCapitalize="none" returnKeyType="next" enterKeyHint='next' style={styles.input} />
            <Button buttonStyle={styles.ajouterImageButton} textStyle={styles.ajouterImageText} title={'Ajouter une photo'} onPress={() => {setSelectImage(true)}}></Button>
            {selectImage && (
                <Button buttonStyle={styles.sourceImageButton} textStyle={styles.sourceImageText} title="Prendre depuis ma galerie" onPress={pickImage} />
            )}
            {selectImage && (
                <Button buttonStyle={styles.sourceImageButton} textStyle={styles.sourceImageText} title="Prendre ma plante en photo" onPress={takePicture} />
            )}
            {photo && (
                <Image
                source={{ uri: 'data:image/jpeg;base64,' + photo }}
                style={styles.image}
                resizeMode="contain"
                />
            )}
            <SelectDropdown
            data={listeAdresse}
            onSelect={(selectedItem, index) => {
              setAddress(selectedItem);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.streetAddress+' '+selectedItem.postalCode+' '+selectedItem.city+' '+selectedItem.region+' '+selectedItem.country) || 'Choisir une adresse'}
                  </Text>
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.streetAddress+' '+item.postalCode+' '+item.city+' '+item.region+' '+item.country}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
            <Button buttonStyle={styles.envoyerPlanteButton} textStyle={styles.envoyerPlanteText} title={'Ajouter la plante'} onPress={envoyerPlante}></Button>
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
  dropdownButtonStyle: {
    backgroundColor: 'rgba(135, 185, 152, 0.49)',
    borderRadius: 10,
    paddingVertical: 15,
    width: '90%',
    marginTop: 30
  },
  dropdownButtonTxtStyle: {
    color: '#FFFFFF',
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
  envoyerPlanteText: {
    color: '#FFFFFF',
    fontFamily: 'KaushanScript',
    textAlign: 'center',
    fontSize: 24
  },
  envoyerPlanteButton: {
    backgroundColor: '#86B883',
    borderRadius: 10,
    paddingVertical: 15,
    width: '90%',
    marginTop: 50
  },
});

export default AjouterPlante;

