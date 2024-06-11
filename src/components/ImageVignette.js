import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

const VignetteImage = ({ game }) => (
    <View style={styles.container}>
        <Text style={styles.title} numberOfLines={1}>{game.name}</Text>
        <ImageBackground source={{ uri: game.image }} style={styles.image}>
            <View style={styles.footer}>
                <Text style={styles.price}>{game.price}</Text>
                <Text style={styles.category}>#{game.catégorie}</Text>
            </View>
        </ImageBackground>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        borderWidth: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
        textAlign: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 150,
        justifyContent: 'flex-end',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    price: {
        color: 'white',
        fontWeight: 'bold',
    },
    category: {
        color: 'white',
    },
});

export default VignetteImage;
