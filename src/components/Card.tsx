import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
    style?: ViewStyle; // Style personnalisé pour la carte
    children: ReactNode; // Enfants du composant
}

const Card: React.FC<CardProps> = ({ style, children }) => {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
    },
});

export default Card;
