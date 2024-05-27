import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

const weatherBackgrounds = {
    clear: require('../../assets/images/sun.gif'),
    rain: require('../../assets/images/rain.gif'),
    clouds: require('../../assets/images/clouds.gif'),
    fog: require('../../assets/images/fog.gif'),
};

const getWeatherBackground = (condition) => {
    switch (condition) {
        case 'Clear':
            return weatherBackgrounds.clear;
        case 'Rain':
            return weatherBackgrounds.rain;
        case 'Drizzle':
            return weatherBackgrounds.rain;
        case 'Clouds':
            return weatherBackgrounds.clouds;
        case 'Fog':
            return weatherBackgrounds.fog;
        case 'Mist':
            return weatherBackgrounds.fog;
        case 'Haze':
            return weatherBackgrounds.fog;
        default:
            return weatherBackgrounds.clear;
    }
};
const getTextColor = (condition) => {
    switch (condition) {
        case 'Clear':
            return 'black';
        case 'Clouds':
            return 'black';
        default:
            return 'white';
    }
};

const DetailedForecast = ({ data, selectedDay, onBack }) => {
    const forecastDetails = data.list.filter((item) => {
        const itemDate = new Date(item.dt_txt);
        return itemDate.getDate() === new Date(data.list[selectedDay * 8].dt_txt).getDate();
    });
    const weatherCondition = data.list[selectedDay * 8].weather[0].main;
    const backgroundImage = getWeatherBackground(weatherCondition);
    const textColor = getTextColor(weatherCondition);
    const weatherDescription = data.list[selectedDay * 8].weather[0].description;
    const capitalizedWeatherDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    const dayName = new Date(data.list[selectedDay * 8].dt_txt).toLocaleDateString('fr-FR', { weekday: 'long' });
    const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);


    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.container}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backText}>Retour</Text>
                </TouchableOpacity>
                <Text style={[styles.dayName, { color: textColor }]}>{capitalizedDay}</Text>
                <Text style={[styles.title, { color: textColor }]}>Détails de la prévision</Text>
                <Text style={[styles.weatherDescription, { color: textColor }]}>Prévu ce jour : {capitalizedWeatherDescription}</Text>
                <ScrollView style={styles.detailsContainer}>
                    {forecastDetails.map((forecast, index) => {
                        const dateTime = new Date(forecast.dt_txt);
                        const formattedTime = `${dateTime.getHours().toString().padStart(2, '0')}h${dateTime.getMinutes().toString().padStart(2, '0')}`;
                        const description = forecast.weather[0].description;
                        const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
                        return (
                            <View key={index} style={[styles.detail, { borderColor: textColor }]}>
                                <Text style={[styles.time, { color: textColor }]}>{formattedTime}</Text>
                                <Image
                                    style={styles.weatherIcon}
                                    source={{ uri: `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png` }}
                                />
                                <Text style={[styles.temperature, { color: textColor }]}>{forecast.main.temp}°C</Text>
                                <Text style={[styles.description, { color: textColor }]}>{capitalizedDescription}</Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    backButton: {
        alignSelf: 'flex-start',
        margin: 10,
        padding: 10,
        backgroundColor: '#147EFB',
        borderRadius: 4,
    },
    backText: {
        color: 'white',
        fontSize: 18,
    },
    title: {
        color: 'white',
        fontSize: 28,
        marginBottom: 20,
    },
    dayName: {
        color: 'white',
        fontSize: 40    ,
        marginBottom: 10,
    },
    detail: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: 10,
        width: '100%',
        minWidth: 200,
    },
    time: {
        fontSize: 18,
        marginBottom: 5,
    },
    weatherIcon: {
        width: 60,
        height: 60,
        marginBottom: 5,
    },
    temperature: {
        fontSize: 24,
        marginBottom: 5,
    },
    description: {
        fontSize: 18,
    },
    weatherDescription: {
        fontSize: 20,
        marginBottom: 20,
    },
    detailsContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
});

export default DetailedForecast;
