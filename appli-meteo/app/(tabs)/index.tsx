import React from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import { WeatherDataFetcher } from '../components/WeatherDataFetcher';
import { WeatherDisplay } from '../components/WeatherDisplay';

const App = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar hidden={false} />
            <View style={styles.container}>
                <WeatherDataFetcher>
                    {(data) => <WeatherDisplay data={data} />}
                </WeatherDataFetcher>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    container: {
        flex: 1,
    },
});

export default App;