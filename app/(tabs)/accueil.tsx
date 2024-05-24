// src/components/Accueil.tsx

import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, ScrollView, Dimensions, TouchableOpacity, PanResponder } from 'react-native';

import Animated, {
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";
import Button from '../../components/Bouton';
const FontImage = require('../../assets/images/background.jpeg');
const Plante_un = require('../../assets/images/plante_un.png');



const Accueil: React.FC = () => {


    const handleSubmit = () => {
        // Ajouter la logique de soumission ici
        console.log('redirection');
        router.replace('./accueil');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <ImageBackground source={FontImage} style={styles.backgroundImage}>
                        <View style={styles.idees}>
                            <Text style={styles.text_idees}>Idées et Astuces</Text>
                            <Text style={styles.text_explore}>EXPLORE</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Photos Plantes</Text>
                        </View>
                    </ImageBackground>
                </View>
                <Image source={Plante_un} style={styles.image_plante} />
                <View style={styles.buttonContainer}>
                    <Button title="En Savoir Plus" onPress={handleSubmit} buttonStyle={styles.customButton} textStyle={styles.customButtonText} />
                </View>
                <Image source={Plante_un} style={styles.image_plante_bis} />
                <Text style={styles.title_section}>Mes Gardes Récentes</Text>
                <View style={styles.carouselContainer}>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        backgroundColor: '#E6F1F0',
        height: '100%',
    },
    imageContainer: {
        width: '130%',
        height: 200,
        marginLeft: '-15%',
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300,
        overflow: 'hidden', // Important pour arrondir les bords de l'image
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    idees: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        alignContent: 'center',
        justifyContent: 'center',
        top: 0,
        width: 135,
        left: 50,
        height: 121,
        backgroundColor: 'rgba(255, 255, 255, 0.40)',
        borderBottomRightRadius: 20,
    },
    text_idees: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontFamily: 'KaushanScript',
        fontSize: 16,
    },
    text_explore: {
        color: 'white',
        fontFamily: 'KaushanScript',
        fontSize: 25,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    textContainer: {
        borderTopColor: 'white',
        borderTopWidth: 1,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontFamily: 'KaushanScript',
        fontSize: 30,
    },
    image_plante: {
        position: 'absolute',
        top: 100,
        width: 94,
        height: 119,
        transform: [{ rotate: '140deg' }],
    },
    image_plante_bis: {
        position: 'absolute',
        top: 110,
        width: 94,
        height: 119,
        right: 0,
        transform: [{ rotate: '-85deg' }],
    },
    buttonContainer: {
        position: 'absolute',
        top: 155,
        width: '100%',
        alignItems: 'center',
    },
    customButton: {
        backgroundColor: '#7FC496',
        borderRadius: 50,
        marginTop: 20,
        width: 200,
        height: 50,
        justifyContent: 'center',
    },
    customButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    title_section: {
        position: 'absolute',
        top: 300,
        width: '100%',
        color: '#47635C',
        fontSize: 24,
        fontFamily: 'KaushanScript',
    },
    // Carousel //
    carouselContainer: {
        marginTop: 150,
        alignItems: 'center',
    },
    carousel: {
        flexDirection: 'row',
    },
    carouselImage: {
        width: 300,
        height: 200,
        marginRight: 10,
    },
    carouselButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
    carouselButtonText: {
        fontSize: 18,
        color: '#333',
    },
});

export default Accueil;