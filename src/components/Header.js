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
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    gameCount: {
        fontSize: 18,
    },
});

export default Header;
