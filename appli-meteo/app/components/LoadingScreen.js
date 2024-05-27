import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const LoadingScreen = () => {
    const [emoji, setEmoji] = useState('☀️');
    const spinAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        const emojiSequence = ['☀️', '🌧️', '☁️','🌩️', '❄️', '🌪️', '🌈'];
        let index = 0;

        const interval = setInterval(() => {
            index = (index + 1) % emojiSequence.length;
            setEmoji(emojiSequence[index]);
        }, 1000);

        Animated.loop(
            Animated.timing(spinAnim, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        return () => clearInterval(interval);
    }, [spinAnim]);

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.emoji, { transform: [{ rotateY: spin }] }]}>
                {emoji}
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    emoji: {
        fontSize: 100,
    },
});

export default LoadingScreen;
