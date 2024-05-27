// src/components/Login.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';

const backgroundImage = require('#/images/background.jpeg');
const logoImage = require('#/images/logo.png');

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        // Ajouter la logique de soumission ici
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.container_logo}>
                <View style={styles.logo}>
                    <ImageBackground source={logoImage} style={styles.logoimage} />
                </View>
            </View>
            <View style={styles.login}>

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container_logo: {
        flex: 1,
        width: 430,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 270, // Ajustez la largeur de votre logo si nécessaire
        height: 150, // Ajustez la hauteur de votre logo si nécessaire
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoimage: {
        width: 247,
        height: 250,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    login: {

    }
});

export default Login;

