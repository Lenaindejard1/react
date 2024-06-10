import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const [cocktails, setCocktails] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCocktails();
    }, []);

    const fetchCocktails = () => {
        setLoading(true);
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
            .then(response => {
                setCocktails(response.data.drinks);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    const filteredCocktails = cocktails.filter(cocktail =>
        cocktail.strDrink.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Rechercher des cocktails"
                value={search}
                onChangeText={setSearch}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={filteredCocktails}
                    keyExtractor={(item) => item.idDrink}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('CocktailDetails', { cocktailId: item.idDrink })}>
                            <View style={styles.itemContainer}>
                                <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
                                <Text style={styles.title}>{item.strDrink}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
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
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    itemContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        left: 5,
    },
    description: {
        fontSize: 14,
        color: 'gray',
    },
});

export default HomeScreen;
