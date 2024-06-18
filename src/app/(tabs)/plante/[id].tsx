import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Bouton';
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import { useApiService } from '@/hooks/useApiService';

const ModifierPlante = () => {
  const [user, setUser] = useState({id: '0', addresses: []});
  const { id } = useLocalSearchParams();
  const [originalPlantName, setOriginalPlantName] = useState('Plante ' + id?.toString());
  const [plantName, setPlantName] = useState('Plante ' + id?.toString());
  const [selectImage, setSelectImage] = useState(false);
  const [photo, setPhoto] = useState('');
  const [address, setAddress] = useState({
    id: '1',
  city: 'Arras',
  country: '',
  streetAddress:  '23 Rue du Dépot',
  postalCode: '62000',
  region: ''});
  const [listeAdresse, setListeAdresse] = useState([
    {
      id: '1',
    city: 'Arras',
    country: '',
    streetAddress:  '23 Rue du Dépot',
    postalCode: '62000',
    region: ''}
  ]);
  const {getMyself, getPlant, getAddress, patchPlant} = useApiService();

  const modifierPlante = async () => {
    if (plantName != "" && address.id != '0') {
      try {
        //if (photo != "") {
          await patchPlant(id?.toString()!,{
            name: plantName,
            photos: [],
            address: 'api/addresses/'+address.id
          })
          /*
        } else {
          const photoResponse = await postPhoto({photo: photo})
          await await patchPlant(id?.toString()!,{
            name: plantName,
            photos: ['api/photos/'+photoResponse.id],
            address: 'api/addresses/'+address.id
          })
        }*/
        console.log('Demande envoyée !')
        router.push('../plantes');
      } catch (err) {
        console.error(err)
      }
    } else {
      alert('Il manque des informations !')
    }
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
      const userResponse =  await getMyself();

      setUser(userResponse);

      let list = []
      for (const address of userResponse.addresses) {
        const idAddress = address.slice(-1);
        list.push(await getAddress(idAddress))
      }
      setListeAdresse(list)

      const plantResponse = await getPlant(id?.toString()!)

      setOriginalPlantName(plantResponse.name);
      setPlantName(plantResponse.name);
      setPhoto(plantResponse.photos[0] ? plantResponse.photos[0] : '');


      setAddress(await getAddress(plantResponse.address.slice(-1)));
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
          <Text style={styles.textHeader}>Modifier {originalPlantName}</Text>
          <View style={styles.topline}><Text style={styles.textTopline}></Text></View>
        </View>
        <View style={styles.div}>
            <TextInput blurOnSubmit={false} placeholder='Nom' placeholderTextColor={'#888686'} value={plantName} onChangeText={setPlantName} autoCapitalize="none" returnKeyType="next" enterKeyHint='next' style={styles.input} />
            <Button buttonStyle={styles.ajouterImageButton} textStyle={styles.ajouterImageText} title={'Modifier la photo'} onPress={() => {setSelectImage(true)}}></Button>
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
                    {(selectedItem && selectedItem.streetAddress+' '+selectedItem.postalCode+' '+selectedItem.city+' '+selectedItem.region+' '+selectedItem.country) || address.streetAddress+' '+address.postalCode+' '+address.city+' '+address.region+' '+address.country}
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
            <Button buttonStyle={styles.modifierPlanteButton} textStyle={styles.modifierPlanteText} title={'Modifier la plante'} onPress={modifierPlante}></Button>
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
    width: '90%'
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
  modifierPlanteText: {
    color: '#FFFFFF',
    fontFamily: 'KaushanScript',
    textAlign: 'center',
    fontSize: 24
  },
  modifierPlanteButton: {
    backgroundColor: '#86B883',
    borderRadius: 10,
    paddingVertical: 15,
    width: '90%',
    marginTop: 50
  },
});

export default ModifierPlante;

