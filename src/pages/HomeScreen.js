import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import VignetteImage from '../components/ImageVignette';
import videoGames from '../data/VideoGames';

const HomeScreen = () => (
    <FlatList
        data={videoGames}
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
        padding: 10,
    },
    gameItem: {
        flex: 1,
        margin: 10,
    },
});

export default HomeScreen;
