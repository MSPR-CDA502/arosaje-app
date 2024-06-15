import { router, useNavigation } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, ScrollView, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { BlurView } from 'expo-blur';
import Button from '../../components/Bouton';


const FontImage = require('#/images/background.jpeg');
const Plante_un = require('#/images/plante_un.png');
const Plante_garde = require('#/images/plante_garde.png');
const Videos_un = require('#/images/videos_un.jpg');
const Videos_deux = require('#/images/videos_deux.jpg');
const Videos_trois = require('#/images/videos_trois.jpg');

const Accueil: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [currentVideoPage, setCurrentVideoPage] = useState(0);
    const pagerRef = useRef<PagerView>(null);
    const videoPagerRef = useRef<PagerView>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage(prevPage => (prevPage + 1) % 3);
        }, 3000); // Change page every 3 seconds

        return () => clearInterval(interval); // Clean up on unmount
    }, []);

    useEffect(() => {
        const videoInterval = setInterval(() => {
            setCurrentVideoPage(prevPage => (prevPage + 1) % 3);
        }, 3000); // Change page every 3 seconds

        return () => clearInterval(videoInterval); // Clean up on unmount
    }, []);

    const handleSubmit = () => {
        // Ajouter la logique de soumission ici
        console.log('redirection');
        router.replace('./accueil');
    };


    const handleGardePress = (num: number) => {
        router.push(`garde/${num}`);
    };
    
    

    const handleButtonPress = (buttonNumber: number) => {
        console.log(`Button ${buttonNumber} pressed`);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.imageContainer}>
                    <BlurView intensity={50} style={styles.blurBackground}>
                        <ImageBackground source={FontImage} style={styles.backgroundImage}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Photos Plantes</Text>
                            </View>
                        </ImageBackground>
                    </BlurView>
                </View>
                <Image source={Plante_un} style={styles.image_plante} />
                <View style={styles.buttonContainer}>
                    <Button title="En Savoir Plus" onPress={handleSubmit} buttonStyle={styles.customButton} textStyle={styles.customButtonText} />
                </View>
                <Image source={Plante_un} style={styles.image_plante_bis} />
                <View style={styles.carouselun}>
                    <Text style={styles.title_section}>Mes Gardes Récentes</Text>
                    <PagerView ref={pagerRef} style={styles.containercarousel} initialPage={0}>
                        {[1, 2, 3].map(num => (
                            <View style={styles.blurContainer} key={num}>
                                <Image source={Plante_garde} style={styles.image_plante_garde} />
                                <Button title={`Garde ${num}`} onPress={() => handleGardePress(num)} buttonStyle={styles.gardebutton} textStyle={styles.customButtonTextGarde} />
                            </View>
                        ))}
                    </PagerView>
                </View>
                <View style={styles.video_container}>
                    <Text style={styles.title_videos}>Vidéos</Text>
                    <PagerView ref={videoPagerRef} style={styles.containercarouselvideo} initialPage={0}>
                        {[1, 2, 3].map(num => (
                            <View style={styles.blurContainer} key={num}>
                                <Image source={Videos_un} style={styles.image_plante_garde} />
                                <Button title={`Vidéo ${num}`} onPress={handleSubmit} buttonStyle={styles.gardebutton} textStyle={styles.customButtonTextGarde} />
                            </View>
                        ))}
                    </PagerView>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Change background color to white
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 100
    },
    imageContainer: {
        width: '130%',
        height: 200,
        marginLeft: '-15%',
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300,
        overflow: 'hidden',
    },
    blurBackground: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    carouselun: {
        zIndex: -1,
        top: -50,
        height: '50%',
        backgroundColor: '#E6F1F0',
    },
    title_section: {
        marginTop: 80,
        width: '100%',
        color: '#47635C',
        fontSize: 24,
        fontFamily: 'KaushanScript',
        alignItems: 'center',
        backgroundColor: '#E6F1F0',
    },
    containercarousel: {
        marginTop: 20,
        height: 300,
        backgroundColor: '#E6F1F0',
    },
    blurContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        borderRadius: 20,
    },
    blurView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        zIndex: 1,
    },
    image_plante_garde: {
        width: 240,
        height: 240,
        borderRadius: 20,
    },
    gardebutton: {
        width: 240,
        height: 240,
        marginTop: -240,
    },
    customButtonTextGarde: {
        color: '#47635C',
        fontSize: 24,
        position: 'absolute',
        top: 200,
        left: 10,
    },
    // Videos Part //
    video_container: {
        backgroundColor: 'white',
        marginTop: 0,
    },
    title_videos: {
        color: '#47635C',
        fontSize: 24,
        fontFamily: 'KaushanScript',
        marginTop: -40,
    },
    containercarouselvideo: {
        marginTop: 0,
        height: 300,
    },
    // Part NavBar //
    nav: {
        marginBottom: 10,
        backgroundColor: 'white', // Background color for the navbar
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 60,
        flexDirection: 'row',
        borderRadius: 20,
    },
    navButton: {
        width: 40,
        height: 40,
    },
    buttonImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default Accueil;

