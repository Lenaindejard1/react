import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';

export function WeatherDataFetcher({ children }) {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=faa6eb44812bff89d58fb910b9b02ecd&lang=fr&units=metric`);
            setWeatherData(response.data);
        })();
    }, []);

    if (!weatherData) {
        return <LoadingScreen />;
    }

    return children(weatherData);
}
