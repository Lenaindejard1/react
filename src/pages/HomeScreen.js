import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import VignetteImage from '../components/ImageVignette';

const HomeScreen = ({ games }) => (
    <FlatList
        data={games}
        renderItem={({ item }) => (
            <View style={styles.gameItem}>
                <VignetteImage game={item} />
            </View>
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        style={styles.list}
    />
);

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#f8f8f8',
        padding: 10,
    },
    gameItem: {
        flex: 1,
        margin: 10,
    },
});

export default HomeScreen;
