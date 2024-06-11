import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ username, gameCount }) => (
    <View style={styles.container}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.gameCount}>{gameCount} jeux</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#6200ee',
        alignItems: 'center',
    },
    username: {
        color: 'white',
        fontSize: 18,
    },
    gameCount: {
        color: 'white',
        fontSize: 18,
    },
});

export default Header;
