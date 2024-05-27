import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import DetailedForecast from './DetailedForecast';
import LoadingScreen from './LoadingScreen';

const weatherBackgrounds = {
    clear: require('../../assets/images/sun.gif'),
    rain: require('../../assets/images/rain.gif'),
    clouds: require('../../assets/images/clouds.gif'),
    fog: require('../../assets/images/fog.gif'),
};

const getTextColor = (condition) => {
    switch (condition) {
        case 'Clear':
        case 'Clouds':
            return 'black';
        default:
            return 'white';
    }
};

export function WeatherDisplay({ data }) {
    const [selectedDay, setSelectedDay] = useState(null);

    if (!data) {
        return <LoadingScreen />;
    }

    if (selectedDay !== null) {
        return <DetailedForecast data={data} selectedDay={selectedDay} onBack={() => setSelectedDay(null)} />;
    }

    const description = data.list[0].weather[0].description;
    const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
    const dateTime = new Date(data.list[0].dt_txt);
    const formattedTime = `${dateTime.getHours().toString().padStart(2, '0')}h${dateTime.getMinutes().toString().padStart(2, '0')}`;
    const weatherCondition = data.list[0].weather[0].main.toLowerCase();
    const backgroundImage = weatherBackgrounds[weatherCondition] || weatherBackgrounds.clear;
    const textColor = getTextColor(weatherCondition);

    const renderDailyForecasts = () => {
        const dailyForecasts = [];
        for (let i = 0; i < 5; i++) {
            const forecast = data.list[i * 8];
            const forecastDate = new Date(forecast.dt_txt);
            let day = forecastDate.toLocaleDateString('fr-FR', { weekday: 'long' });
            day = day.charAt(0).toUpperCase() + day.slice(1);
            dailyForecasts.push(
                <TouchableOpacity key={i} style={[styles.dailyForecast, { borderColor: textColor }]}
                                  onPress={() => setSelectedDay(i)}>
                    <Text style={[styles.day, { color: textColor }]}>{day}</Text>
                    <Image
                        style={styles.dailyIcon}
                        source={{ uri: `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png` }}
                    />
                    <Text style={[styles.dailyTemp, { color: textColor }]}>{forecast.main.temp}°C</Text>
                </TouchableOpacity>
            );
        }
        return dailyForecasts;
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: textColor }]}>{data.city.name}</Text>
                <Text style={[styles.time, { color: textColor }]}>Mise à jour: {formattedTime}</Text>
                <Image
                    style={styles.weatherIcon}
                    source={{ uri: `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png` }}
                />
                <Text style={[styles.temperature, { color: textColor }]}>{data.list[0].main.temp}°C</Text>
                <Text style={[styles.description, { color: textColor }]}>{capitalizedDescription}</Text>
                <View style={[styles.separator, { backgroundColor: textColor }]}></View>
                <Text style={[styles.forecastTitle, { color: textColor }]}>Prévision pour les 5 jours</Text>
                <ScrollView horizontal style={styles.dailyContainer}>
                    {renderDailyForecasts()}
                </ScrollView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        color: 'white',
        fontSize: 24,
    },
    title: {
        fontSize: 36,
        marginBottom: 20,
    },
    time: {
        fontSize: 18,
        marginBottom: 20,
    },
    weatherIcon: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    temperature: {
        fontSize: 36,
        marginBottom: 20,
    },
    description: {
        fontSize: 24,
        marginBottom: 20,
    },
    separator: {
        width: '80%',
        height: 1,
        backgroundColor: 'white',
        marginBottom: 20,
    },
    forecastTitle: {
        fontSize: 28,
        marginBottom: 20,
    },
    dailyContainer: {
        flexDirection: 'row',
    },
    dailyForecast: {
        alignItems: 'center',
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        height: 150,
        width: 150,
    },
    day: {
        fontSize: 18,
        marginBottom: 5,
    },
    dailyIcon: {
        width: 60,
        height: 60,
        marginBottom: 5,
    },
    dailyTemp: {
        fontSize: 18,
    },
});

export default WeatherDisplay;
