import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
    title: string; // Le texte affiché sur le Button
    onPress: () => void; // La fonction à appeler lorsque le Button est pressé
    buttonStyle?: any; // Style personnalisé pour le Button
    textStyle?: any; // Style personnalisé pour le texte du Button
}

const Button: React.FC<ButtonProps> = ({ title, onPress, buttonStyle, textStyle }) => {
    return (
        <TouchableOpacity style={[buttonStyle]} onPress={onPress}>
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: 'KaushanScript',
    },
});

export default Button;