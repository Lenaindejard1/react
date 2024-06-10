import React, { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import haversine from 'haversine-distance';
import Icon from 'react-native-vector-icons/FontAwesome';

const RechercheBars = () => {
    const [bars, setBars] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state for the API call
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        const fetchBars = async () => {
            await getUserLocation();
        };
        fetchBars();
    }, []);

    useEffect(() => {
        if (userLocation) {
            searchBars();
        }
    }, [userLocation]);

    const getUserLocation = async () => {
        try {
            setLoading(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission refusée', 'Permission d\'accéder à la localisation a été refusée');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'obtention de votre position.');
            setLoading(false);
        }
    };

    const searchBars = async () => {
        if (!userLocation) {
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=bar](around:3000,${userLocation.latitude},${userLocation.longitude});out;`);
            const barsWithDistance = response.data.elements.map(bar => {
                const barLocation = { latitude: bar.lat, longitude: bar.lon };
                const distance = haversine(userLocation, barLocation);
                return { ...bar, distance };
            }).sort((a, b) => a.distance - b.distance).slice(0, 50);
            setBars(barsWithDistance);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur s\'est produite lors de la recherche des bars.');
        }
        setLoading(false);
    };

    const openGoogleMaps = (lat, lon) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />
            ) : (
                <FlatList
                    data={bars}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.barContainer} onPress={() => openGoogleMaps(item.lat, item.lon)}>
                            <Text style={styles.barName}>{item.tags.name || 'Nom inconnu'}</Text>
                            <Text style={styles.barDistance}>{(item.distance / 1000).toFixed(2)} km</Text>
                            <Icon name="map-marker" size={15} color="red" style={styles.locationIcon} />
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={<Text style={styles.emptyMessage}>Aucun bar trouvé à proximité.</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    spinner: {
        marginTop: 20,
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 10,
        borderRadius: 20,
        borderWidth: 2,
    },
    barName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    barDistance: {
        fontSize: 16,
        color: '#888',
        marginRight: 10,
        marginLeft: 10,
    },
    locationIcon: {
        marginLeft: 'auto',
        fontSize: 40,
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    },
});

export default RechercheBars;
