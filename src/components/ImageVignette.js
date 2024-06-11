import React from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';

const VignetteImage = ({ source, vignette }) => (
    <ImageBackground source={source} style={styles.image}>
        <Text style={styles.vignette}>{vignette}</Text>
    </ImageBackground>
);

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        justifyContent: 'flex-end',
        borderWidth:2,
    },
    vignette: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        padding: 5,
    },
});

export default VignetteImage;
